import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CriarPagamentoDTO,
  CriarPagamentoMercadoPagoDTO,
  CriarPagamentoMercadoPagoResponseDTO,
} from '../dtos';
import { PagamentoEntity } from '@/domain/entities';

@Injectable()
export class MercadoPagoMapper {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  paraCriarPagamentoMercadoPagoDTO(
    criarPagamentoDTO: CriarPagamentoDTO,
  ): CriarPagamentoMercadoPagoDTO {
    return {
      external_reference: criarPagamentoDTO.idPedido,
      total_amount: criarPagamentoDTO.valorPedido,
      title: this.configService.get<string>('MERCADO_PAGO_TITULO_PAGAMENTO'),
      description: this.configService.get<string>(
        'MERCADO_PAGO_DESCRICAO_PAGAMENTO',
      ),
      notification_url: this.configService.get<string>(
        'MERCADO_PAGO_NOTIFICATION_URL',
      ),
      items: [
        {
          sku_number: criarPagamentoDTO.idPedido,
          category: 'PEDIDO',
          title: this.configService.get<string>(
            'MERCADO_PAGO_TITULO_PAGAMENTO',
          ),
          description: this.configService.get<string>(
            'MERCADO_PAGO_DESCRICAO_PAGAMENTO',
          ),
          unit_price: criarPagamentoDTO.valorPedido,
          quantity: 1,
          unit_measure: 'unit',
          total_amount: criarPagamentoDTO.valorPedido,
        },
      ],
    };
  }

  criarEntidadePagamento(
    criarPagamentoDTO: CriarPagamentoDTO,
    criarPagamentoMercadoPagoResponseDTO: CriarPagamentoMercadoPagoResponseDTO,
  ) {
    return new PagamentoEntity({
      idPedido: criarPagamentoDTO.idPedido,
      valorPedido: criarPagamentoDTO.valorPedido,
      qrCode: criarPagamentoMercadoPagoResponseDTO.qr_data,
    });
  }
}
