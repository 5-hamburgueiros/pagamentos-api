import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CriarPagamentoUseCase {
  constructor(
    @Inject(PagamentoRepository)
    private readonly pagamentoRepository: PagamentoRepository,
  ) {}

  async executar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return await this.pagamentoRepository.criar(pagamento);
  }
}
