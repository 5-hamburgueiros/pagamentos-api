import { PagamentoEntity } from '@/domain/entities';
import { PagamentoRepository } from '@/domain/repository';
import { PagamentoModelTypeOrm } from '@/infra/database/typeorm/model/pagamento.typeorm.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoRepositoryTypeOrm implements PagamentoRepository {
  constructor(
    @InjectRepository(PagamentoModelTypeOrm)
    private readonly pedidoRepository: Repository<PagamentoModelTypeOrm>,
  ) {}
  
  criar(params: PagamentoRepository.Criar.Entrada): Promise<PagamentoEntity> {
    throw new Error('Method not implemented.');
  }
  pegaPorId(params: PagamentoRepository.PegarPorId.Entrada): Promise<PagamentoEntity> {
    throw new Error('Method not implemented.');
  }
  atualizar(params: PagamentoRepository.Atualizar.Entrada): Promise<PagamentoEntity> {
    throw new Error('Method not implemented.');
  }
  getNumeroPedido(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  
}
