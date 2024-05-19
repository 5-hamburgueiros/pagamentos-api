import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseProdiver } from '@/infra/providers/database.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: DataBaseProdiver, inject: [ConfigService] }),
  ],
})
export class DatabaseModule { }