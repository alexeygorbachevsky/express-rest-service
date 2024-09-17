const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_DB: process.env['POSTGRES_DB'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  DOCKER_POSTGRES_HOST: process.env['DOCKER_POSTGRES_HOST'],
  JWT_SECRET: process.env['JWT_SECRET'],
  USE_FASTIFY: process.env['USE_FASTIFY'],
};
