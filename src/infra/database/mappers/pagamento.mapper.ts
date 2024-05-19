import { CriarPagamentoDTO } from "@/api/dtos";
import { PagamentoEntity } from "@/domain/entities";

export class PagamentoMapper {
  static paraEntidade(criarPagamentoDTO: CriarPagamentoDTO): PagamentoEntity {
    throw new Error('Method not implemented.');
  }
}
