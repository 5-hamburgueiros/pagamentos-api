export namespace ErrosDominio {

  export enum Pagamento {
    ID_ITEM_NAO_INFORMADO = 'QR Code não informado!',
    PEDIDO_NAO_INFORMADO = 'Pedido não informado!',
    PAGAMENTO_JA_REALIZADO = 'Pagamento já foi realizado!',
    PAGAMENTO_JA_CANCELADO = 'Pagamento já foi cancelado!',
    QR_CODE_NAO_INFORMADO = 'QR Code não informado!',
  }

  export enum ItemPagamento {
    ID_ITEM_NAO_INFORMADO = 'ID do item não informado!',
    CATEGORIA_NAO_INFORMADA = 'Categoria não informada!',
    NOME_NAO_INFORMADO = 'Nome não informado!',
    DESCRICAO_NAO_INFORMADA = 'Descrição não informada!',
    VALOR_UNIDADE_NAO_INFORMADO = 'Valor da unidade não informado!',
    QUANTIDADE_NAO_INFORMADA = 'Quantidade não informada!',
  }

}
