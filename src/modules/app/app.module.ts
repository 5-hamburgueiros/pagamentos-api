import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from '../health/health.module';
import { DataBaseProdiver } from '@/infra/providers/database.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: DataBaseProdiver, inject: [ConfigService] }),
    HealthModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule { }
