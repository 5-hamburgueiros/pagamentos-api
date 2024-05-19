import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetPagamentoPorPedidoUseCase {
  constructor(
    @Inject(PagamentoRepository)
    private readonly pagamentoRepository: PagamentoRepository,
  ) {}

  async executar(idPagamento: string): Promise<PagamentoEntity> {
    const pagamentoEncontrado = await this.pagamentoRepository.pegarPorId(idPagamento);
    this.validarRetorno(pagamentoEncontrado);
    return pagamentoEncontrado;
  }

  private validarRetorno(pagamento: PagamentoEntity): void {
    if (!pagamento) {
      throw new PagamentoNaoEncontradoException();
    }
  }
}
