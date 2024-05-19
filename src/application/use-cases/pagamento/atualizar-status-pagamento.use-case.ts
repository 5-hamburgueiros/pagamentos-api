import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoEntity } from '@/domain/entities';
import { StatusPagamento } from '@/domain/enum';
import { PagamentoRepository } from '@/domain/repository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AtualizarStatusPagamentoUseCase {

  constructor(
    @Inject(PagamentoRepository)
    private readonly pagamentoRepository: PagamentoRepository,
  ) { }

  async executar(idPedido: string, statusPagamento: StatusPagamento): Promise<PagamentoEntity> {
    const pagamento: PagamentoEntity = await this.pagamentoRepository.pegarPorPedido(idPedido);
    this.validaPagamento(pagamento);
    pagamento.status = statusPagamento;
    const pagamentoAtualizado = await this.pagamentoRepository.atualizar(pagamento);
    return pagamentoAtualizado;
  }

  private validaPagamento(pagamento: PagamentoEntity) {
    if (!pagamento) {
      throw new PagamentoNaoEncontradoException();
    }
  }
}
