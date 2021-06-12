import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import * as fs from 'fs';

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
    fs.appendFileSync('./logs/info.log', `${info} \r\n`, {
      encoding: 'utf8',
      flag: 'a',
    });
  });
};

module.exports = requestLogger;
