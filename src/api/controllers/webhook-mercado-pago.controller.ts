import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { NotificacaoPagamentoMercadoPagoDTO } from '../dtos';
import { PagamentoService } from '@/domain/services/pagamento.service';

@Controller('webhook-mercado-pago')
export class WebHookMercadoPagoController {
  constructor(
    @Inject(PagamentoService)
    private pagamentoService: PagamentoService,
  ) {}

  @Post()
  getNotificacaoMercadoPago(
    @Body()
    notificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO,
  ) {
    return this.pagamentoService.receberNotificacao(
      notificacaoPagamentoMercadoPagoDTO,
    );
  }
}
