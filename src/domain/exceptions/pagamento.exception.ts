import { ErrosDominio } from "../enum/erros-dominio.enum";
import { DomainException } from "./domain.exception";

export class PagamentoException extends DomainException {
  constructor(mensagem: ErrosDominio.Pagamento) {
    super(mensagem);
  }
}