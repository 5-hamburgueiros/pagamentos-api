import { ErrosDominio } from "../enum/erros-dominio.enum";
import { DomainException } from "./domain.exception";

export class ItemPagamentoException extends DomainException {
  constructor(mensagem: ErrosDominio.ItemPagamento) {
    super(mensagem);
  }
}