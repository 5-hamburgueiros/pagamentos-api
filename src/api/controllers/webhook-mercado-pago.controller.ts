import { Body, Controller, Post } from "@nestjs/common";
import { NotificacaoPagamentoMercadoPagoDTO } from "../dtos";

@Controller('webhook-mercado-pago')
export class WebHookMercadoPagoController {
  constructor() {}

  @Post()
  getNotificacaoMercadoPago(@Body() NotificacaoPagamentoMercadoPagoDTO: NotificacaoPagamentoMercadoPagoDTO) {
  }
}