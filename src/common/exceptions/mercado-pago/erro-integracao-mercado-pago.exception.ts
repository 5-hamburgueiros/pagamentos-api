import { HttpException, HttpStatus } from '@nestjs/common';

export class ErroIntegracaoMercadoPagoException extends HttpException {
  constructor(mensagem: string) {
    super(mensagem, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
