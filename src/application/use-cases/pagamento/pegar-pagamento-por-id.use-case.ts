import { PagamentoNaoEncontradoException } from '@/common/exceptions/pagamento/pagamento-nao-encontrado.exception';
import { PagamentoRepository } from '@/domain/repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PegarPagamentoPorIdUseCase {
  constructor(
    @Inject(PagamentoRepository)
    private readonly clienteRepository: PagamentoRepository,
  ) {}

  async execute(idPagamento: PagamentoRepository.PegarPorId.Entrada): Promise<PagamentoRepository.Atualizar.Saida> {
    const pagamentoEncontrado = await this.clienteRepository.pegaPorId(idPagamento);
    this.validarRetorno(pagamentoEncontrado);
    return pagamentoEncontrado;
  }

  private validarRetorno(pagamento: PagamentoRepository.PegarPorId.Saida): void {
    if (!pagamento) {
      throw new PagamentoNaoEncontradoException();
    }
  }
}
