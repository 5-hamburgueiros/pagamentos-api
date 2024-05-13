import { ErrosDominioEnum } from '../enum/erros-dominio.enum';
import { StatusPagamento } from '../enum/status-pagamento.enum';
import { DomainException } from '../exceptions/domain.exception';
import { AbstractEntity } from './abstract.entity';

export class PagamentoEntity extends AbstractEntity {
  public qrData: string;
  public idExterno: string; 
  public status: StatusPagamento;
  public idPedido: string;

  constructor(params: PagamentoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.qrData = params.qrData;
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

  public setIdExterno(idExterno: string){
    this.idExterno = idExterno;
  }

  private validaPagamento(): void {
    if (this.status === StatusPagamento.PAGO) {
      throw new DomainException(ErrosDominioEnum.PAGAMENTO_JA_REALIZADO);
    }
    if (this.status === StatusPagamento.CANCELADO) {
      throw new DomainException(ErrosDominioEnum.PAGAMENTO_JA_CANCELADO);
    }
  }
  
  private validaCancelamento(): void {
    if (this.status === StatusPagamento.CANCELADO) {
      throw new DomainException(ErrosDominioEnum.PAGAMENTO_JA_CANCELADO);
    }
  }

  private verificaPropriedadesObrigatorias(): void {
    if (!this.qrData) {
      throw new DomainException(ErrosDominioEnum.QR_CODE_NAO_INFORMADO);
    }
    if (!this.idPedido) {
      throw new DomainException(ErrosDominioEnum.PEDIDO_NAO_INFORMADO);
    }
  }
}

export namespace PagamentoModel {
  export type Params = {
    id?: string;
    idPedido: string;
    qrData?: string;
    idExterno?: string;
    status?: StatusPagamento;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}