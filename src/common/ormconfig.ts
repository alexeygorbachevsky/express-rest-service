import { ConnectionOptions } from 'typeorm';
import User from '../users/entities/user.entity';
import Board from '../boards/entities/board.entity';
import Task from '../tasks/entities/task.entity';
import Column from '../boards/entities/column.entity';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = require('./config');

const config: ConnectionOptions = {
  type: 'postgres',
  // For running app not from docker change host (POSTGRES_HOST) value to 'localhost'
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: [
    // 'src/resources/**/*.model{.ts,.js}',
    // 'build/resources/**/*.model{.ts,.js}',
    User,
    Board,
    Task,
    Column,
  ],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
