import { PagamentoEntity } from '@/domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { PedidoService } from '@/domain/services/pedido.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { NotificarPedidoDTO } from '../dtos/pedido/notificar-pedido.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class PedidoServiceImpl implements PedidoService {
  pedidoApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.pedidoApiUrl = this.configService.get('PEDIDO_API_URL');
  }

  notificar(pagamento: PagamentoEntity): Observable<AxiosResponse<any, any>> {
    const body: NotificarPedidoDTO = {
      status: pagamento.status,
    };
    return this.httpService.patch(`${this.pedidoApiUrl}/pedidos/${pagamento.idPedido}/status`, body);
  }
}
