import { ConfigService } from "@nestjs/config";
import { CreatePagamentoDTO } from "../pagamento/create-pagamento.dto";

export class CreatePagamentoMercadoPagoDTO implements CreatePagamentoMercadoPagoDTO {

  external_reference: string;
  items: CreatePagamentoMercadoPagoItensDTO[];
  total_amount: number;
  title: string;
  description: string;
  notification_url: string;

  constructor(createPagamentoDTO: CreatePagamentoDTO) {
    this.external_reference = createPagamentoDTO.id_pedido;
    this.title = createPagamentoDTO.titulo;
    this.description = createPagamentoDTO.descricao;
    this.items = this.getItens(createPagamentoDTO);
    this.total_amount = this.calcularValorTotal(this.items);
    this.notification_url = this.getUrlNotificacao();
  }

  private getItens(createPagamentoDTO: CreatePagamentoDTO): CreatePagamentoMercadoPagoItensDTO[] {

    return createPagamentoDTO.items.map(item => ({
      sku_number: item.id,
      category: item.categoria,
      title: item.nome,
      description: item.descricao,
      unit_price: item.valor_unidade,
      quantity: item.quantidade,
      unit_measure: 'unit',
      total_amount: item.valor_unidade * item.quantidade
    }));
  }

  private calcularValorTotal(items: CreatePagamentoMercadoPagoItensDTO[]): number {
    return Number(items.reduce((acumulador, atual) => (acumulador + atual.total_amount), 0.0).toFixed(2));
  }

  private getUrlNotificacao(): string {
    const configService = new ConfigService();
    return configService.get('MERCADO_PAGO_NOTIFICATION_URL');
  }
}

interface CreatePagamentoMercadoPagoItensDTO {
  sku_number: string,
  category: string,
  title: string,
  description: string,
  unit_price: number,
  quantity: number,
  unit_measure: string,
  total_amount: number
}