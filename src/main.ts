import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/http-exception.filter';

const path = require('path');
const YAML = require('yamljs');
const { PORT } = require('./common/config');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
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
