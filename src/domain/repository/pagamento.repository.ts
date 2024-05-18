import { PagamentoEntity } from '../entities';

export interface PagamentoRepository {
  criar(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  atualizar(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  getPorId(id: string): Promise<PagamentoEntity>;
}

export const PagamentoRepository = Symbol('PagamentoRepository'); 
