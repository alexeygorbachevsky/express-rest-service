import { NextFunction, Request, Response } from 'express';
import { IErrorDefiner } from '../errors/errors';

const { ErrorDefiner } = require('../errors/errors');
const Errors = require('../errors/constants');
const writeToFile = require('../errors/writeToFile');

const errorHandler = (
  err: IErrorDefiner,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const time = new Date();
  switch (true) {
    case err instanceof ErrorDefiner: {
      // eslint-disable-next-line no-console
      console.error('Status code', err.status);
      res.status(err.status).send(err.message);
      break;
    }
    default: {
      // eslint-disable-next-line no-console
      console.error('Status code', Errors.SERVER_ERROR);
      res.status(Errors.SERVER_ERROR).send('Internal Server Error');
    }
  }
  const errorText = err.message || 'Internal Server Error';
  writeToFile(`${time} - ${errorText}`);

  next(err);
};

module.exports = errorHandler;
