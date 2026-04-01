import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import express from 'express';
import { INestApplication, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const server = express();
  let app: INestApplication;

  try {
    // create nest application
    app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      bufferLogs: true,
    });

    // get config
    const config = app.get(ConfigService);
    const logger = app.get(Logger);
    const port = config.get<number>('app.http.port');
    const host = config.get<string>('app.http.host');

    app.useLogger(logger);
    app.enableCors(config.get('app.cors'));
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    // Start server
    await app.listen(port, host);

    const appUrl = await app.getUrl();
    logger.log(`Server running on: ${appUrl}`);
  } catch (error) {
    console.error('Server failed to start:', error);
    if (app) await app.close();
    process.exit(1);
  }
}
void bootstrap();
