import { PagamentoRepository } from "@/domain/repository";
import { Inject } from "@nestjs/common";

export class CriarPagamentoMercadoPagoUseCase {
  constructor(
    @Inject(PagamentoRepository)
    private readonly pagamentoRepository: PagamentoRepository
  ) { }

  async executar(pagamento) {
    return this.pagamentoRepository.criar(pagamento);
  }
}