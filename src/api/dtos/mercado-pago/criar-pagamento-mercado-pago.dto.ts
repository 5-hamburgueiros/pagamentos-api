export interface CriarPagamentoMercadoPagoDTO {
  external_reference: string;
  total_amount: number;
  title: string;
  description: string;
  notification_url: string;
  items: CriarPagamentoMercadoPagoItensDTO[];
}

interface CriarPagamentoMercadoPagoItensDTO {
  sku_number: string,
  category: string,
  title: string,
  description: string,
  unit_price: number,
  quantity: number,
  unit_measure: string,
  total_amount: number
}
