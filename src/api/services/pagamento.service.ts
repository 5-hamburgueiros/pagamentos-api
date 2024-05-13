import { PagamentoRepositoryTypeOrm } from '@/infra/repository/pagamento';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(PagamentoRepositoryTypeOrm)
    private readonly repository: Repository<PagamentoRepositoryTypeOrm>,
  ) { }
}
