import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from '../health/health.module';
import { ConfigModule } from '@nestjs/config';
import { PagamentoController } from '@/api/controllers/pagamento.controller';
import { WebHookMercadoPagoController } from '@/api/controllers/webhook-mercado-pago.controller';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { PagamentoServiceImpl } from '@/api/services/pagamento.service.impl';
import { CriarPagamentoUseCase, GetPagamentoPorIdUseCase, AtualizarStatusPagamentoUseCase, GetPagamentoPorPedidoUseCase } from '@/application/use-cases/pagamento';
import { MercadoPagoHelper } from '@/api/helpers/mercado-pago.helper';
import { PagamentoRepository } from '@/domain/repository';
import { HttpModule } from '@nestjs/axios';
import { PagamentoRepositoryImpl } from '@/infra/repository/pagamento';
import { DatabaseModule } from '../database/database.module';
import { typeOrmEntities } from '@/infra/database/typeorm/config/typeorm.models';
import { MercadoPagoMapper } from '@/api/mappers/mercado-pago.mapper';
import { PedidoService } from '@/domain/services/pedido.service';
import { PedidoServiceImpl } from '@/api/services/pedido.service.impl';

const useCases: Provider[] = [CriarPagamentoUseCase, AtualizarStatusPagamentoUseCase, GetPagamentoPorPedidoUseCase, GetPagamentoPorIdUseCase];
const helpers: Provider[] = [MercadoPagoHelper];
const mappers: Provider[] = [MercadoPagoMapper];
const services: Provider[] = [
  {
    provide: PagamentoService,
    useClass: PagamentoServiceImpl
  },
  {
    provide: PedidoService,
    useClass: PedidoServiceImpl
  },
];
const repositorios: Provider[] = [
  {
    provide: PagamentoRepository,
    useClass: PagamentoRepositoryImpl
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    HttpModule,
    TypeOrmModule.forFeature(typeOrmEntities),
  ],
  providers: [
    ...useCases,
    ...helpers,
    ...mappers,
    ...services,
    ...repositorios,
  ],
  exports: [],
  controllers: [PagamentoController, WebHookMercadoPagoController]
})
export class AppModule { }