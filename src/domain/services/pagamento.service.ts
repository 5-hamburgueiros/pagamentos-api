import { CreatePagamentoDTO } from '@/api/dtos';
import { PagamentoEntity } from '../entities';

export interface PagamentoService {
  criar(createPagamentoDTO: CreatePagamentoDTO): Promise<PagamentoEntity>;
}

export const PagamentoService = Symbol('PagamentoService'); 
