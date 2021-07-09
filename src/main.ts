import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

const path = require('path');
const YAML = require('yamljs');
const { PORT, USE_FASTIFY } = require('./common/config');

async function bootstrap() {
  let app;
  if (USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        // logger: true,
      })
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, '0.0.0.0');
}

bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('App running error', err);
  });
