import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { PagamentoTypeOrmMapper } from '@/infra/database/mappers/pagamento.mapper';
import { PagamentoModelTypeOrm } from '@/infra/database/typeorm/model/pagamento.typeorm.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoRepositoryImpl implements PagamentoRepository {
  constructor(
    @InjectRepository(PagamentoModelTypeOrm)
    private readonly pagamentoRepository: Repository<PagamentoModelTypeOrm>,
  ) {}

  criar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository
      .save(pagamento)
      .then(this.mapearParaEntidade);
  }
  atualizar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository
      .save(pagamento)
      .then(this.mapearParaEntidade);
  }
  pegarPorId(id: string): Promise<PagamentoEntity> {
    return this.pagamentoRepository
      .findOne({ where: { id } })
      .then(this.mapearParaEntidade);
  }
  pegarPorPedido(idPedido: string): Promise<PagamentoEntity> {
    return this.pagamentoRepository
      .findOneBy({ idPedido })
      .then(this.mapearParaEntidade);
  }

  private mapearParaEntidade(response: PagamentoModelTypeOrm): PagamentoEntity {
    return response ? PagamentoTypeOrmMapper.paraEntidade(response) : null;
  }
}
