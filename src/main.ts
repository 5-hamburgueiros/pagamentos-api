import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  const port = getAppPort(app);
  SwaggerStartup.init(app, port);
  await app.listen(port);
}
bootstrap();

function getAppPort(app: INestApplication): number {
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  return Number(port);
}
