import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { SwaggerStartup } from './infra/startup';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');

  SwaggerStartup.init(app);
  await app.listen(Number(port));
}
bootstrap();
