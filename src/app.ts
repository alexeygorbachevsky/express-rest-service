import { Request, Response, NextFunction } from 'express';

export {};
const express = require('express');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(() => {
  throw new Error();
});

app.use(errorHandler);

process.on('uncaughtException', ({ message }: Error) => {
  const defaultMessage = 'UncaughtException is occurred';
  // eslint-disable-next-line no-console
  console.error('UncaughtException error:', message || defaultMessage);
  fs.appendFileSync(
    './errors.log',
    `UncaughtException error: ${message || defaultMessage} \r\n`,
    { encoding: 'utf8', flag: 'a' }
  );
  process.exit(1);
});

module.exports = app;
