import { Observable } from 'rxjs';
import { PagamentoEntity } from '../entities';
import { AxiosResponse } from 'axios';

export interface PedidoService {
  notificar(pagamento: PagamentoEntity): Observable<AxiosResponse<any>>;
}

export const PedidoService = Symbol('PedidoService');
