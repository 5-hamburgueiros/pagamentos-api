import { StatusPagamento } from '@/domain/enum';

export interface NotificarPedidoDTO {
  status: StatusPagamento;
}
