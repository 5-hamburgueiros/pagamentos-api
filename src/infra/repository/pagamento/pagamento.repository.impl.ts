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
  ) { }

  criar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository.save(pagamento).then(response => PagamentoTypeOrmMapper.paraEntidade(response));;
  }
  atualizar(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return this.pagamentoRepository.save(pagamento).then(response => PagamentoTypeOrmMapper.paraEntidade(response));;
  }
  pegarPorId(id: string): Promise<PagamentoEntity> {
    return this.pagamentoRepository.findOneBy({ id }).then(response => PagamentoTypeOrmMapper.paraEntidade(response));
  }
  pegarPorPedido(idPedido: string): Promise<PagamentoEntity> {
    return this.pagamentoRepository.findOneBy({ idPedido }).then(response => PagamentoTypeOrmMapper.paraEntidade(response));
  }
}
