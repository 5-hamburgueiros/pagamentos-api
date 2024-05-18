import { ErrosDominio } from '../enum/erros-dominio.enum';
import { ItemPagamentoException } from '../exceptions/item-pagamento.exception';
import { AbstractEntity } from './abstract.entity';

export class ItemPagamentoEntity extends AbstractEntity {
  public id: string;
  public idItem: string;
  public categoria: string;
  public nome: string;
  public descricao: string;
  public valorUnidade: number;
  public quantidade: number;

  constructor(params: ItemPagamentoParams) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.idItem = params.idItem;
    this.categoria = params.categoria;
    this.nome = params.nome;
    this.descricao = params.descricao;
    this.valorUnidade = params.valorUnidade;
    this.quantidade = params.quantidade;
    this.verificaPropriedadesObrigatorias();
  }

  private verificaPropriedadesObrigatorias(): void {
    if (!this.idItem) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.ID_ITEM_NAO_INFORMADO);
    }
    if (!this.categoria) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.CATEGORIA_NAO_INFORMADA);
    }
    if (!this.nome) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.NOME_NAO_INFORMADO);
    }
    if (!this.descricao) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.DESCRICAO_NAO_INFORMADA);
    }
    if (!this.valorUnidade) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.VALOR_UNIDADE_NAO_INFORMADO);
    }
    if (!this.quantidade) {
      throw new ItemPagamentoException(ErrosDominio.ItemPagamento.QUANTIDADE_NAO_INFORMADA);
    }
  }
}

export type ItemPagamentoParams = {
  id: string;
  idItem: string;
  categoria: string,
  nome: string,
  descricao: string,
  valorUnidade: number,
  quantidade: number,
  criadoEm?: string;
  atualizadoEm?: string;
}