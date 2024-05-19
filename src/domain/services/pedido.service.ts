import { PagamentoEntity } from '../entities';

export interface PedidoService {
  notificar(pagamento: PagamentoEntity): void;
}

export const PedidoService = Symbol('PedidoService'); 
