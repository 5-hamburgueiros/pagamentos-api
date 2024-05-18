import {
  Column,
  Entity,
  Index,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ItemPagamentoEntity } from '@/domain/entities/item-pagamento.entity';
import { PagamentoModelTypeOrm } from './pagamento.typeorm.model';

@Entity({ name: 'ItemPagamento' })
@Index(['id'])
export class ItemPagamentoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ nullable: false})
  idItem: string;
  
  @Column({ nullable: false})
  categoria: string;

  @Column({ nullable: false})
  nome: string;

  @Column({ nullable: false})
  descricao: string;

  @Column({ nullable: false})
  valorUnidade: number;

  @Column({ nullable: false})
  quantidade: number;

  @OneToOne(() => PagamentoModelTypeOrm)
  @JoinTable()
  pagamento: PagamentoModelTypeOrm;

  static FromEntity(params: ItemPagamentoEntity): ItemPagamentoModelTypeOrm {
    const model = new ItemPagamentoModelTypeOrm();
    model.id = params.id;
    model.idItem = params.idItem;
    model.categoria = params.categoria;
    model.nome = params.nome;
    model.descricao = params.descricao;
    model.valorUnidade = params.valorUnidade;
    model.quantidade = params.quantidade; 
    return model;
  }
}
