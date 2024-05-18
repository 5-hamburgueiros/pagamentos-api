import { PagamentoEntity } from '@/domain/entities';
import { StatusPagamento } from '@/domain/enum';
import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ItemPagamentoModelTypeOrm } from './item-pagamento.typeorm.model';

@Entity({ name: 'Pagamento' })
@Index(['id'])
export class PagamentoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ nullable: false})
  idPedido: string;
  
  @Column({ nullable: false})
  titulo: string;

  @Column({ nullable: false})
  descricao: string;

  @Column({ name: 'qrCode' })
  qrCode: string;

  @IsOptional()
  @Column({ name: 'idExterno', nullable: true})
  idExterno: string;

  @Column({ name: 'statusPagamento', default: StatusPagamento.AGUARDANDO_PAGAMENTO })
  status: StatusPagamento;

  @OneToMany(() => ItemPagamentoModelTypeOrm, itemPagamento => itemPagamento.pagamento)
  items: ItemPagamentoModelTypeOrm

  static FromEntity(params: PagamentoEntity): PagamentoModelTypeOrm {
    const model = new PagamentoModelTypeOrm();
    model.id = params.id;
    model.qrCode = params.qrCode;
    model.idExterno = params.idExterno;
    model.status = params.status;
    model.idPedido = params.idPedido;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
