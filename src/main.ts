import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  SwaggerStartup.init(app);
  await app.listen(getAppPort(app));
}
bootstrap();

function getAppPort(app: INestApplication): number {
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  return Number(port);
}
