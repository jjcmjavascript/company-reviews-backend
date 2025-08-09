import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from '@shared/interceptors/logging.interceptor';
import { AppConfig, CorsConfig } from '@config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const corsConfig = configService.get<CorsConfig>('cors');
  const appConfig = configService.get<AppConfig>('app');

  await app.register(fastifyCookie, {
    secret: appConfig.cookieSecret, // for cookies signature
  });

  await app.register(helmet);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: corsConfig.origins,
    credentials: corsConfig.credentials,
  });

  await app.listen(appConfig.port, '0.0.0.0');
}

bootstrap();
