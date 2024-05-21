import {
  CriarPagamentoDTO,
  NotificacaoPagamentoMercadoPagoDTO,
} from '@/api/dtos';
import { PagamentoEntity } from '../entities';

export interface PagamentoService {
  criar(criarPagamento: CriarPagamentoDTO): Promise<PagamentoEntity>;
  receberNotificacao(
    notificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO,
  ): void;
  pegarPorPedido(idPedido: string): Promise<PagamentoEntity>;
  pegarPorId(id: string): Promise<PagamentoEntity>;
}

export const PagamentoService = Symbol('PagamentoService');
