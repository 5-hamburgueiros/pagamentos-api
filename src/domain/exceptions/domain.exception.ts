import { ErrosDominioEnum } from "../enum/erros-dominio.enum";

export class DomainException extends Error {
  constructor(erroDominio: ErrosDominioEnum) {
    super(erroDominio);
    this.name = 'DomainException';
  }
}