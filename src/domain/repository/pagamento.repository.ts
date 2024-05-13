import { PagamentoEntity } from '../entities';

export interface PagamentoRepository {
  criar(
    params: PagamentoRepository.Criar.Entrada,
  ): Promise<PagamentoRepository.Criar.Saida>;
  pegaPorId(
    params: PagamentoRepository.PegarPorId.Entrada,
  ): Promise<PagamentoRepository.PegarPorId.Saida>;
  atualizar(
    params: PagamentoRepository.Atualizar.Entrada,
  ): Promise<PagamentoRepository.Atualizar.Saida>;
  getNumeroPedido(): Promise<number>;
}

export const aPagamentoRepository = Symbol('PagamentoRepository');

export namespace PagamentoRepository {

  export namespace Criar {
    export type Entrada =  PagamentoEntity;
    export type Saida = PagamentoEntity;
  }

  export namespace PegarPorId {
    export type Entrada = string;
    export type Saida = PagamentoEntity;
  }

  export namespace Atualizar {
    export type Entrada = PagamentoEntity;
    export type Saida = PagamentoEntity;
  }
}
