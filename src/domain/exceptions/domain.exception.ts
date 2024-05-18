export abstract class DomainException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'DomainException';
  }
}