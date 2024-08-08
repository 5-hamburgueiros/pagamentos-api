import { MensagemPagamentoStatusDTO } from '@/api/dtos/pagamento/mensagem-pagamento-status.dto';
import { AtualizarStatusPagamentoUseCase } from '@/application/use-cases/pagamento';
import { StatusPagamento } from '@/domain/enum';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { PedidoCompensacao } from './interfaces/pedido-compensacao.interface';
import { StatusPagamentoProducerService } from './status-pagamento-producer.service';

@Injectable()
export class PagamentoCompensacaoService {
  constructor(
    @Inject(AtualizarStatusPagamentoUseCase)
    private readonly atualizarStatusPagamentoUseCase: AtualizarStatusPagamentoUseCase,
    private readonly statusPagamentoProducerService: StatusPagamentoProducerService,
  ) {}

  @RabbitSubscribe({ queue: 'pedido_compensatorio_pagamento' })
  async compensatoria(message: PedidoCompensacao) {
    const params = {
      idPedido: message.pedido,
      status: StatusPagamento.ESTORNO,
    };

    this.atualizarStatusPagamentoUseCase.executar(
      params.idPedido,
      params.status,
    );

    this.statusPagamentoProducerService.enviarPedidoCompensacao(
      params.idPedido,
    );
  }
}
