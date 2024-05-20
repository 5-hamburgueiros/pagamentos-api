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

  async executar(idPedido: string): Promise<PagamentoEntity> {
    const pagamentoEncontrado = await this.pagamentoRepository.pegarPorPedido(
      idPedido,
    );
    this.validarRetorno(pagamentoEncontrado);
    return pagamentoEncontrado;
  }

  private validarRetorno(pagamento: PagamentoEntity): void {
    if (!pagamento) {
      throw new PagamentoNaoEncontradoException();
    }
  }
}
