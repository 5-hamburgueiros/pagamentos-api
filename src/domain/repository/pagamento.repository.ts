import { PagamentoEntity } from '../entities';

export interface PagamentoRepository {
  criar(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  atualizar(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  pegarPorId(id: string): Promise<PagamentoEntity>;
  pegarPorPedido(idPedido: string): Promise<PagamentoEntity>;
}

export const PagamentoRepository = Symbol('PagamentoRepository'); 
