import { ConnectionOptions } from 'typeorm';

const {
  POSTGRES_HOST,
  // DOCKER_POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = require('./config');

const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  // host: DOCKER_POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  entities: [
    'src/resources/**/*.model{.ts,.js}',
    'build/resources/**/*.model{.ts,.js}',
  ],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
