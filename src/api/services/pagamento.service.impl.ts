import { PagamentoEntity } from '@/domain/entities';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoHelper } from '../helpers/mercado-pago.helper';
import { firstValueFrom } from 'rxjs';
import { ErroIntegracaoMercadoPagoException } from '@/common/exceptions/mercado-pago/erro-integracao-mercado-pago.exception';
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { CriarPagamentoUseCase } from '@/application/use-cases/pagamento/criar-pagamento.use-case';
import { CriarPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago-response.dto';
import { CriarPagamentoDTO } from '../dtos/pagamento/criar-pagamento.dto';
import { CriarPagamentoMercadoPagoDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago.dto';
import { MercadoPagoMapper } from '../mappers/mercado-pago.mapper';
import { NotificacaoPagamentoMercadoPagoDTO } from '../dtos';
import { TipoNotificacaoMercadoPago } from '@/common/enums/tipo-notificacao-mercado-pago.enum';
import { GetPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/get-pagamento-mercado-pago-response.dto';
import { AtualizarStatusPagamentoUseCase } from '@/application/use-cases/pagamento/atualizar-status-pagamento.use-case';
import { StatusPagamento } from '@/domain/enum';

@Injectable()
export class PagamentoServiceImpl implements PagamentoService {
  constructor(
    @Inject(CriarPagamentoUseCase)
    private readonly criarPagamentoUseCase: CriarPagamentoUseCase,
    @Inject(AtualizarStatusPagamentoUseCase)
    private readonly atualizarStatusPagamentoUseCase: AtualizarStatusPagamentoUseCase,
    @Inject(MercadoPagoHelper)
    private mercadoPagoHelper: MercadoPagoHelper,
    @Inject(MercadoPagoMapper)
    private mercadoPagoMapper: MercadoPagoMapper
  ) { }

  async criar(criarPagamentoDTO: CriarPagamentoDTO): Promise<PagamentoEntity> {
    const criarPagamentoMercadoPagoDTO: CriarPagamentoMercadoPagoDTO = this.mercadoPagoMapper.paraCriarPagamentoMercadoPagoDTO(criarPagamentoDTO);
    const criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO = await firstValueFrom(this.mercadoPagoHelper.getRequisicaoCriarPagamento(criarPagamentoMercadoPagoDTO));
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
