import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IErrorDefiner } from './errors';

const { ErrorDefiner } = require('./errors');
const Errors = require('./constants');

type Fn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncWrap = (fn: Fn): RequestHandler => (req, res, next, ...args) => {
  const fnReturn = fn(req, res, next, ...args);
  return Promise.resolve(fnReturn).catch(next);
};

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

module.exports = { appErrorHandler, asyncWrap };
