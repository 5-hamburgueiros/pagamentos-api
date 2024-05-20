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
    return this.httpService.patch('http://localhost:3500/teste', body);
  }
}

/*
curl --request PATCH \
  --url http://localhost:3000/pedidos/6642cad2c84a88404bce13ed/status \
  --header 'Content-Type: application/json' \
  --data '{
  "status": "PAGO"
}'
*/
