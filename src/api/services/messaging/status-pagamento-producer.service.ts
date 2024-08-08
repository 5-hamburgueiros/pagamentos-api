import { MensagemPagamentoStatusDTO } from '@/api/dtos/pagamento/mensagem-pagamento-status.dto';
import { StatusPagamento } from '@/domain/enum';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusPagamentoProducerService {

  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {
  }

  async enviaPagamentoConfirmado(idPedido: string) {
    const mensagem = this.criaMensagem(idPedido, StatusPagamento.PAGO);
    try {
      await this.amqpConnection.managedChannel.sendToQueue('pagamentos_confirmados', mensagem)
      console.log("enviei", mensagem)
    } catch (error) {
      console.log("erro ao enviar mensagem", error)
    }
  }

  async enviaPagamentoCancelado(idPedido: string) {
    const mensagem = this.criaMensagem(idPedido, StatusPagamento.CANCELADO);
    try {
      await this.amqpConnection.managedChannel.sendToQueue('pagamentos_cancelados', mensagem)
      console.log("enviei", mensagem)
    } catch (error) {
      console.log("erro ao enviar mensagem", error)
    }
  }

  async enviarPedidoCompensacao(idPedido: string) {
    const mensagem = this.criaMensagem(idPedido, StatusPagamento.CANCELADO);
    try {
      await this.amqpConnection.managedChannel.sendToQueue('pedido_compensatorio_pedido', mensagem);
      console.log("enviei", mensagem)
    } catch (error) {
      console.log("erro ao enviar mensagem", error)
    }
  }

  private criaMensagem(idPedido: string, status: StatusPagamento): string {
    return new MensagemPagamentoStatusDTO()
      .setIdPedido(idPedido)
      .setStatus(status)
      .toString();
  }
}