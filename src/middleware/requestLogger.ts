import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { url = '/', method, query = {}, body = {} } = req;
  const start = Date.now();
  next();

  finished(res, (error) => {
    const ms = Date.now() - start;
    const { statusCode } = res;

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Stream failed', error);
    } else {
      // eslint-disable-next-line no-console
      console.log(`
        Method: ${method}, 
        Whole url: ${url}, 
        Query params: ${JSON.stringify(query)}, 
        Body: ${JSON.stringify(body)}, 
        Status code: ${statusCode}, 
        Milliseconds: ${ms}ms `);
    }
  });
};

module.exports = requestLogger;
