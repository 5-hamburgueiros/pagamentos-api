import { PagamentoEntity } from '@/domain/entities';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoHelper } from '../helpers/mercado-pago.helper';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { CriarPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago-response.dto';
import { CriarPagamentoDTO } from '../dtos/pagamento/criar-pagamento.dto';
import { CriarPagamentoMercadoPagoDTO } from '../dtos/mercado-pago/criar-pagamento-mercado-pago.dto';
import { MercadoPagoMapper } from '../mappers/mercado-pago.mapper';
import { NotificacaoPagamentoMercadoPagoDTO } from '../dtos';
import { TipoNotificacaoMercadoPago } from '@/common/enums/tipo-notificacao-mercado-pago.enum';
import { GetPagamentoMercadoPagoResponseDTO } from '../dtos/mercado-pago/get-pagamento-mercado-pago-response.dto';
import { StatusPagamento } from '@/domain/enum';
import {
  CriarPagamentoUseCase,
  GetPagamentoPorPedidoUseCase,
  AtualizarStatusPagamentoUseCase,
  GetPagamentoPorIdUseCase,
} from '@/application/use-cases/pagamento';
import { ErroIntegracaoMercadoPagoException } from '@/common/exceptions/mercado-pago/mercado-pago.exception';
import { StatusPagamentoProducerService } from './messaging/status-pagamento-producer.service';

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
    private mercadoPagoMapper: MercadoPagoMapper,
    private readonly statusPagamentoProducer: StatusPagamentoProducerService,
  ) {}

  async criar(criarPagamentoDTO: CriarPagamentoDTO): Promise<PagamentoEntity> {
    const criarPagamentoMercadoPagoDTO: CriarPagamentoMercadoPagoDTO =
      this.mercadoPagoMapper.paraCriarPagamentoMercadoPagoDTO(
        criarPagamentoDTO,
      );
    const criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO =
      await firstValueFrom(
        this.mercadoPagoHelper.getRequisicaoCriarPagamento(
          criarPagamentoMercadoPagoDTO,
        ),
      );
    this.validaResponseCriarPagamento(criarPagamentoMercadoPagoResponseDTO);

    const pagamento: PagamentoEntity =
      this.mercadoPagoMapper.criarEntidadePagamento(
        criarPagamentoDTO,
        criarPagamentoMercadoPagoResponseDTO,
      );
    return this.criarPagamentoUseCase.executar(pagamento);
  }

  async receberNotificacao(
    notificacao: NotificacaoPagamentoMercadoPagoDTO,
  ): Promise<void> {
    const idPedido = 'f1b6d555-4a77-44e6-a220-fed3c1889df9';
    const idExterno = idPedido;
    const statusPagamento: StatusPagamento = StatusPagamento.PAGO;
    const pagamento: PagamentoEntity =
      await this.atualizarStatusPagamentoUseCase.executar(
        idPedido,
        statusPagamento,
        idExterno,
      );
    await this.notificarPedido(pagamento);

    return;

    if (this.validaNotificacaoPagamento(notificacao)) {
      const idExterno = notificacao.data.id;
      const response: GetPagamentoMercadoPagoResponseDTO = await firstValueFrom(
        this.mercadoPagoHelper.getRequisicaoDadosPagamento(idExterno),
      );
      const idPedido = response?.external_reference;
      const statusPagamento: StatusPagamento =
        this.mercadoPagoHelper.getStatusPagamento(response?.status);

      const pagamento: PagamentoEntity =
        await this.atualizarStatusPagamentoUseCase.executar(
          idPedido,
          statusPagamento,
          idExterno,
        );
      await this.notificarPedido(pagamento);
    }
  }

  async pegarPorId(id: string): Promise<PagamentoEntity> {
    return this.getPagamentoPorIdUseCase.executar(id);
  }

  async pegarPorPedido(idPedido: string): Promise<PagamentoEntity> {
    return this.getPagamentoPorPedidoUseCase.executar(idPedido);
  }

  private validaResponseCriarPagamento(
    response: CriarPagamentoMercadoPagoResponseDTO,
  ): void {
    if (!response || !response.qr_data) {
      throw new ErroIntegracaoMercadoPagoException(
        MensagensErro.ERRO_CRIAR_PAGAMENTO_MERCADO_PAGO,
      );
    }
  }

  private validaNotificacaoPagamento(
    notificacao: NotificacaoPagamentoMercadoPagoDTO,
  ): boolean {
    const action = notificacao?.action;
    const idExterno = notificacao?.data?.id;
    return (
      [
        TipoNotificacaoMercadoPago.PAYMENT_CREATED,
        TipoNotificacaoMercadoPago.PAYMENT_UPDATED,
      ].includes(action) && idExterno
    );
  }

  private async notificarPedido(pagamento: any) {
    if (pagamento.status === StatusPagamento.PAGO) {
      this.statusPagamentoProducer.enviaPagamentoConfirmado(pagamento.idPedido);
    }
    if (pagamento.status === StatusPagamento.CANCELADO) {
      this.statusPagamentoProducer.enviaPagamentoCancelado(pagamento.idPedido);
    }
  }
}
