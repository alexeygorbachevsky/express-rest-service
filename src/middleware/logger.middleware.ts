import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { finished } from 'stream';

const writeToFile = require('../common/writeToFile');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req, res, next) {
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
        this.logger.log(`Stream failed, ${error}`);
      } else {
        this.logger.log(`${info}`);
      }
      writeToFile(info, './logs/info.log');
    });
  }
}
