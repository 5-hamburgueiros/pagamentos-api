import { MensagensErro } from '@/common/enums/mensagens-erro.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PagamentoNaoEncontradoException extends HttpException {
  constructor() {
    super(MensagensErro.PAGAMENTO_NAO_ENCONTRADO, HttpStatus.NOT_FOUND);
  }
}
