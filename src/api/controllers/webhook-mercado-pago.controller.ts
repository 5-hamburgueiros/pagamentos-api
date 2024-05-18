import { Body, Controller, Post } from "@nestjs/common";
import { NotificacaoPagamentoMercadoPagoDTO } from "../dtos";

@Controller('webhook-mercado-pago')
export class PagamentoController {

  constructor() {}

  @Post()
  getNotificacaoMercadoPago(@Body() NotificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO) {
  }
}