import { ErrosDominio } from '../enum/erros-dominio.enum';
import { StatusPagamento } from '../enum/status-pagamento.enum';
import { PagamentoException } from '../exceptions/pagamento.exception';
import { AbstractEntity } from './abstract.entity';

export class PagamentoEntity extends AbstractEntity {
  public id: string;
  public idPedido: string;
  public titulo: string;
  public descricao: string;
  public qrCode: string;
  public idExterno: string;
  public status: StatusPagamento;


  constructor(params: PagamentoParams) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.qrCode = params.qrCode;
    this.idPedido = params.idPedido;
    this.status = params.status ?
      params.status : StatusPagamento.AGUARDANDO_PAGAMENTO;
    this.idExterno = params.idExterno;
    this.verificaPropriedadesObrigatorias();
  }

  public pagar(): void {
    this.validaPagamento();
    this.status = StatusPagamento.PAGO;
  }

  public cancelar(): void {
    this.validaCancelamento();
    this.status = StatusPagamento.CANCELADO;
  }

  public setIdExterno(idExterno: string) {
    this.idExterno = idExterno;
  }

  private validaPagamento(): void {
    if (this.status === StatusPagamento.PAGO) {
      throw new PagamentoException(ErrosDominio.Pagamento.PAGAMENTO_JA_REALIZADO);
    }
    if (this.status === StatusPagamento.CANCELADO) {
      throw new PagamentoException(ErrosDominio.Pagamento.PAGAMENTO_JA_CANCELADO);
    }
  }

  private validaCancelamento(): void {
    if (this.status === StatusPagamento.CANCELADO) {
      throw new PagamentoException(ErrosDominio.Pagamento.PAGAMENTO_JA_CANCELADO);
    }
  }

  private verificaPropriedadesObrigatorias(): void {
    if (!this.qrCode) {
      throw new PagamentoException(ErrosDominio.Pagamento.QR_CODE_NAO_INFORMADO);
    }
    if (!this.idPedido) {
      throw new PagamentoException(ErrosDominio.Pagamento.PEDIDO_NAO_INFORMADO);
    }
  }
}

export type PagamentoParams = {
  id?: string;
  idPedido: string;
  titulo: string;
  descricao: string;
  qrCode?: string;
  idExterno?: string;
  status?: StatusPagamento;
  criadoEm?: string;
  atualizadoEm?: string;
}