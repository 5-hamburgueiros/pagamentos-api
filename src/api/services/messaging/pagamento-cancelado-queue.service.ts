import { MensagemPagamentoStatusDTO } from '@/api/dtos/pagamento/mensagem-pagamento-status.dto';
import { StatusPagamento } from '@/domain/enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class PagamentoCanceladoQueueService {
  private client: ClientProxy;

  constructor(
    private configService: ConfigService,
  ) {
    const queue = this.configService.get('QUEUE_PAGAMENTOS_CANCELADOS');
    const host = this.configService.get('RMQ_HOST');
    const user = this.configService.get('RMQ_USER');
    const password = this.configService.get('RMQ_PASSWORD');
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queue,
      },
    });
  }

  async emit(idPedido: string) {
    return await this.client
      .emit('', this.criaMensagem(idPedido))
      .toPromise();
  }

  private criaMensagem(idPedido: string): string {
    return new MensagemPagamentoStatusDTO()
      .setIdPedido(idPedido)
      .setStatus(StatusPagamento.CANCELADO)
      .toString();
  }
}