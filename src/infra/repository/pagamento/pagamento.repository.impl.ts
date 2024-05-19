import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { PagamentoModelTypeOrm } from '@/infra/database/typeorm/model/pagamento.typeorm.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoRepositoryImpl implements PagamentoRepository {
  constructor(
    @InjectRepository(PagamentoModelTypeOrm)
    private readonly pagamentoRepository: Repository<PagamentoModelTypeOrm>,
  ) { }

  criar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository.save(pagamento);
  }
  atualizar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository.save(pagamento);
  }
  pegarPorId(id: string): Promise<PagamentoEntity> {
    throw new Error('Method not implemented.');
  }
}
