import { CriarPagamentoDTO, NotificacaoPagamentoMercadoPagoDTO } from '@/api/dtos';
import { PagamentoEntity } from '../entities';

export interface PagamentoService {
  criar(criarPagamento: CriarPagamentoDTO): Promise<PagamentoEntity>;
  atualizar(notificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO): Promise<PagamentoEntity>;
  pegarPorPedido(idPedido: string): Promise<PagamentoEntity>;
  pegarPorId(id: string): Promise<PagamentoEntity>;
}

export const PagamentoService = Symbol('PagamentoService'); 
