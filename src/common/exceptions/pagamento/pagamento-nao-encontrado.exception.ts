
import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PagamentoNaoEncontradoException extends HttpException {
  constructor() {
    super(MensagensErro, HttpStatus.BAD_REQUEST);
  }
}
