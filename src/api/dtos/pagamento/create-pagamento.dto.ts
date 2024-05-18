export interface CreatePagamentoDTO {
  "id_pedido": string,
  "titulo": string,
  "descricao": string,
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

const body: CreatePagamentoDTO = {
  "id_pedido": "123",
  "titulo": "Pagamento de Pedido",
  "descricao": "Pagamento do pedido 123",
  "items": [
    {
      "id": "1",
      "categoria": "Produto",
      "nome": "Produto 1",
      "descricao": "Produto 1",
      "valor_unidade": 50.00,
      "quantidade": 1,
    },
    {
      "id": "2",
      "categoria": "Produto",
      "nome": "Produto 2",
      "descricao": "Produto 2",
      "valor_unidade": 50.00,
      "quantidade": 2,
    }
  ]
};