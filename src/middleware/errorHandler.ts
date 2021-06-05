import { NextFunction, Request, Response } from 'express';
import { IErrorDefiner } from '../errors/errors';

const { ErrorDefiner } = require('../errors/errors');
const Errors = require('../errors/constants');

const appErrorHandler = (
  err: IErrorDefiner,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (true) {
    case err instanceof ErrorDefiner: {
      res.sendStatus(err.status);
      break;
    }
    default: {
      res.sendStatus(Errors.SERVER_ERROR);
    }
  }
  next();
};

module.exports = appErrorHandler;
