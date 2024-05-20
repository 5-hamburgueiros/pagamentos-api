import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class IntegracaoApiException extends HttpException {
  constructor() {
    super(MensagensErro.ERRO_NOTIFICAR_PEDIDO, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
