import { Config } from '@/infra/configs/config';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { typeOrmEntities } from '@/infra/database/typeorm/config/typeorm.models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
    TypeOrmModule.forFeature(typeOrmEntities),
    HealthModule,
    {
      module: DatabaseModule,
      global: true,
    },
  ],
  providers: [
    CorrelationService,
  ],
  exports: [CorrelationService],
})
export class AppModule {}
