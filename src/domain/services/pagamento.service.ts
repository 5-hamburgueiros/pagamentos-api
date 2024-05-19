import { CriarPagamentoDTO } from '@/api/dtos';
import { PagamentoEntity } from '../entities';

export interface PagamentoService {
  criar(criarPagamento: CriarPagamentoDTO): Promise<PagamentoEntity>;
}

export const PagamentoService = Symbol('PagamentoService'); 
