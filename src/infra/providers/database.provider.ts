import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmEntities } from '../database/typeorm/config/typeorm.models';
import { ConfigService } from '@nestjs/config';

export const DataBaseProdiver: DataBaseProviderType = (
  config: ConfigService,
) => ({
  type: 'postgres',
  host: config.get('DATABASE_HOST'),
  port: +config.get('DATABASE_PORT'),
  username: config.get('DATABASE_USER'),
  password: config.get('DATABASE_PASS'),
  database: config.get('DATABASE_NAME'),
  synchronize: true,
  entities: typeOrmEntities,
  ssl:
    config.get('NODE_ENV') === 'development'
      ? false
      : { rejectUnauthorized: false },
  extra: {
    trustedConnection: config.get('NODE_ENV') !== 'development',
    trustServerCertificate: true,
  },
});

export type DataBaseProviderType = (
  config: ConfigService,
) => TypeOrmModuleOptions;
