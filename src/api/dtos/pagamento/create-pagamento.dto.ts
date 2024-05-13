export interface CreatePagamentoDTO {
  "id_pedido": string,
  "titulo": string,
  "descricao": string,
  "valor_total": number,
  "items": CreatePagamentoItemDTO[]
}

export interface CreatePagamentoItemDTO {
  "id": string,
  "categoria": string,
  "nome": string,
  "descricao": string,
  "valor_unidade": number,
  "quantidade": number,
}