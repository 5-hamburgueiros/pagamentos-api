import { PagamentoCompensacaoService } from '@/api/services/messaging/pagamento-compensacao.service';
import { StatusPagamentoProducerService } from '@/api/services/messaging/status-pagamento-producer.service';
import { PagamentoServiceImpl } from '@/api/services/pagamento.service.impl';
import { AtualizarStatusPagamentoUseCase } from '@/application/use-cases/pagamento';
import { PagamentoRepository } from '@/domain/repository';
import { PagamentoService } from '@/domain/services/pagamento.service';
import { PagamentoRepositoryImpl } from '@/infra/repository/pagamento';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { typeOrmEntities } from '@/infra/database/typeorm/config/typeorm.models';
import { TypeOrmModule } from '@nestjs/typeorm';

const useCases: Provider[] = [AtualizarStatusPagamentoUseCase];
const services: Provider[] = [
  {
    provide: PagamentoService,
    useClass: PagamentoServiceImpl,
  },
];
const repositorios: Provider[] = [
  {
    provide: PagamentoRepository,
    useClass: PagamentoRepositoryImpl,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature(typeOrmEntities),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('RMQ_HOST');
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASSWORD');
        return {
          uri: [`amqp://${user}:${password}@${host}`],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    ...useCases,
    ...repositorios,
    StatusPagamentoProducerService,
    PagamentoCompensacaoService,
  ],
  exports: [StatusPagamentoProducerService],
})
export class MessagingModule {}

{
}
