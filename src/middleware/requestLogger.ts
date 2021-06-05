import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

const writeToFile = require('../errors/writeToFile');

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { url = '/', method, query = {}, body = {} } = req;
  const start = Date.now();
  const eventTime = new Date();
  next();

  finished(res, (error) => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    const info = ` Request Logging:
        Event time: ${eventTime},
        Method: ${method}, 
        Whole url: ${url}, 
        Query params: ${JSON.stringify(query)}, 
        Body: ${JSON.stringify(body)}, 
        Status code: ${statusCode}, 
        Milliseconds: ${ms}ms `;

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Stream failed', error);
    } else {
      // eslint-disable-next-line no-console
      console.log(info);
    }
    writeToFile(info, './logging.log');
  });
};

module.exports = requestLogger;
