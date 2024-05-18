import { PagamentoRepository } from "@/domain/repository";
import { Inject } from "@nestjs/common";

export class CriarPagamentoMercadoPagoUseCase {
  constructor(
    @Inject(PagamentoRepository)
    private readonly pagamentoRepository: PagamentoRepository
  ) { }

  async execute(pagamento) {
    return this.pagamentoRepository.criar(pagamento);
  }
}