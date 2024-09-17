import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

const { USE_FASTIFY } = require('../common/config');
const writeToFile = require('../common/writeToFile');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { url = '/', method, query = {}, body = {} } = request;

    const status = exception.getStatus();
    const eventTime = new Date();

    const info = ` Request Logging:
        Event time: ${eventTime},
        Method: ${method}, 
        Whole url: ${url}, 
        Query params: ${JSON.stringify(query)}, 
        Body: ${JSON.stringify(body)}, 
        Status code: ${status}`;
    this.logger.log(`${info}`);
    writeToFile(info, './logs/info.log');

    const error = ` Errors Logging:
        Event time: ${eventTime},
        Status code: ${status}, 
        Whole url: ${url}
        Error message: ${exception?.message}`;
    this.logger.error(error);
    writeToFile(error);
    const payload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (USE_FASTIFY === 'true') {
      response.status(status).send(payload);
    } else {
      response.status(status).json(payload);
    }
  }
}
