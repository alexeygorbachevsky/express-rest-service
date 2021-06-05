import { Request, Response, NextFunction } from 'express';

const errorLogger = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  next(err);
};

module.exports = errorLogger;
