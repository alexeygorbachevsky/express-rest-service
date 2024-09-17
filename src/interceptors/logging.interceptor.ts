import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

const writeToFile = require('../common/writeToFile');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { url = '/', method, query = {}, body = {} } = request;

    const start = Date.now();
    const eventTime = new Date();

    return next.handle().pipe(
      tap(
        () => {
          const { statusCode } = response;
          const info = ` Request Logging:
        Event time: ${eventTime},
        Method: ${method}, 
        Whole url: ${url}, 
        Query params: ${JSON.stringify(query)}, 
        Body: ${JSON.stringify(body)}, 
        Status code: ${statusCode}, 
        Milliseconds: ${Date.now() - start}ms `;

          this.logger.log(`${info}`);
          writeToFile(info, './logs/info.log');
        },
        (err) => {
          this.logger.error(`Intercept error: ${err}`);
          writeToFile(`Intercept error: ${err}`);
        }
      )
    );
  }
}
