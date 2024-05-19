import { StatusPagamento } from '@/domain/enum';
import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';

@Entity({ name: 'Pagamento' })
@Index(['id'])
export class PagamentoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ nullable: false })
  @Unique(['idPedido'])
  idPedido: string;

  @Column({ nullable: false, type: 'float'})
  valorPedido: number;

  @Column({ name: 'qrCode' })
  qrCode: string;

  @IsOptional()
  @Column({ name: 'idExterno', nullable: true })
  idExterno: string;

  @Column({ name: 'statusPagamento', default: StatusPagamento.AGUARDANDO_PAGAMENTO })
  status: StatusPagamento;
}
