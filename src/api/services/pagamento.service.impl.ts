import { PagamentoEntity } from '@/domain/entities';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoHelper } from '../helpers/mercado-pago.helper';
import { firstValueFrom } from 'rxjs';
import { ErroIntegracaoMercadoPagoException } from '@/common/exceptions/mercado-pago/erro-integracao-mercado-pago.exception';
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { CriarPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago-response.dto';
import { CriarPagamentoDTO } from '../dtos/pagamento/criar-pagamento.dto';
import { CriarPagamentoMercadoPagoDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago.dto';
import { MercadoPagoMapper } from '../mappers/mercado-pago.mapper';
import { NotificacaoPagamentoMercadoPagoDTO } from '../dtos';
import { TipoNotificacaoMercadoPago } from '@/common/enums/tipo-notificacao-mercado-pago.enum';
import { GetPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/get-pagamento-mercado-pago-response.dto';
import { StatusPagamento } from '@/domain/enum';
import { CriarPagamentoUseCase, GetPagamentoPorPedidoUseCase, AtualizarStatusPagamentoUseCase, GetPagamentoPorIdUseCase } from '@/application/use-cases/pagamento';

@Injectable()
export class PagamentoServiceImpl implements PagamentoService {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private readonly criarPagamentoUseCase: CriarPagamentoUseCase,
    @Inject(AtualizarStatusPagamentoUseCase)
    private readonly atualizarStatusPagamentoUseCase: AtualizarStatusPagamentoUseCase,
    @Inject(GetPagamentoPorPedidoUseCase)
    private readonly getPagamentoPorPedidoUseCase: GetPagamentoPorPedidoUseCase,
    @Inject(GetPagamentoPorIdUseCase)
    private readonly getPagamentoPorIdUseCase: GetPagamentoPorIdUseCase,
    @Inject(MercadoPagoHelper)
    private mercadoPagoHelper: MercadoPagoHelper,
    @Inject(MercadoPagoMapper)
    private mercadoPagoMapper: MercadoPagoMapper
  ) { }

  async criar(criarPagamentoDTO: CriarPagamentoDTO): Promise<PagamentoEntity> {
    const criarPagamentoMercadoPagoDTO: CriarPagamentoMercadoPagoDTO = this.mercadoPagoMapper.paraCriarPagamentoMercadoPagoDTO(criarPagamentoDTO);
    //const criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO = await firstValueFrom(this.mercadoPagoHelper.getRequisicaoCriarPagamento(criarPagamentoMercadoPagoDTO));
    //teste
    const criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO = {
      in_store_order_id: '123',
      qr_data: '123'
    }
    this.validaResponseCriarPagamento(criarPagamentoMercadoPagoResponseDTO);

    const pagamento: PagamentoEntity = this.mercadoPagoMapper.criarEntidadePagamento(criarPagamentoDTO, criarPagamentoMercadoPagoResponseDTO);
    return this.criarPagamentoUseCase.executar(pagamento);
  }

  async atualizar(notificacao: NotificacaoPagamentoMercadoPagoDTO): Promise<PagamentoEntity> {
    if (this.validaNotificacaoPagamento(notificacao)) {
      const idExterno = notificacao.data.id;
      const response: GetPagamentoMercadoPagoResponseDTO = await firstValueFrom(this.mercadoPagoHelper.getRequisicaoDadosPagamento(idExterno));

      const idPedido = response?.external_reference;
      const statusPagamento: StatusPagamento = this.mercadoPagoHelper.getStatusPagamento(response?.status);
      return this.atualizarStatusPagamentoUseCase.executar(idPedido, statusPagamento);
    }
  }

  async pegarPorId(id: string): Promise<PagamentoEntity> {
    return this.getPagamentoPorIdUseCase.executar(id);
  }

  async pegarPorPedido(idPedido: string): Promise<PagamentoEntity> {
    return this.getPagamentoPorPedidoUseCase.executar(idPedido);
  }

  private validaResponseCriarPagamento(response: CriarPagamentoMercadoPagoResponseDTO): void {
    if (!response || !response.qr_data) {
      throw new ErroIntegracaoMercadoPagoException(MensagensErro.ERRO_CRIAR_PAGAMENTO_MERCADO_PAGO);
    }
  }

  private validaResponseGetDadosPagamento(response: GetPagamentoMercadoPagoResponseDTO): void {
    if (!response) {
      throw new ErroIntegracaoMercadoPagoException(MensagensErro.ERRO_PEGAR_DADOS_PAGAMENTO);
    }
  }

  private validaNotificacaoPagamento(notificacao: NotificacaoPagamentoMercadoPagoDTO): boolean {
    const action = notificacao?.action;
    const idExterno = notificacao?.data?.id;
    return [
      TipoNotificacaoMercadoPago.PAYMENT_CREATED,
      TipoNotificacaoMercadoPago.PAYMENT_UPDATED,
    ].includes(action) && idExterno;
  }
}
