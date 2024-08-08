import { MensagemPagamentoStatusDTO } from '@/api/dtos/pagamento/mensagem-pagamento-status.dto';
import { AtualizarStatusPagamentoUseCase } from '@/application/use-cases/pagamento';
import { StatusPagamento } from '@/domain/enum';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoCompensacaoService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(AtualizarStatusPagamentoUseCase)
    private readonly atualizarStatusPagamentoUseCase: AtualizarStatusPagamentoUseCase,
  ) {}

  @RabbitSubscribe({ queue: 'pedido_compensatorio_pagamento' })
  async compensatoria(message: any) {
    const params = {
      idPedido: message.pedido,
      status: StatusPagamento.ESTORNO,
    };

    this.atualizarStatusPagamentoUseCase.executar(
      params.idPedido,
      params.status,
    );

    await this.amqpConnection.managedChannel.sendToQueue(
      'pedido_compensatorio_pedido',
      JSON.stringify({ ...params, status: StatusPagamento.CANCELADO }),
    );
  }
}
