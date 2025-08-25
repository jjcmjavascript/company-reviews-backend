// all-exceptions.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DefaultLogger } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new DefaultLogger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // Soporta Express o Fastify:
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttp
      ? (exception as HttpException).message
      : 'Internal server error';

    const ignoredRoutes = ['/is_logged'];

    this.logger.error({
      message: `exception.filter.service: (${status}) ${req.method} ${req.url} - ${message}`,
      stack: !ignoredRoutes.includes(req?.url) && (exception as Error)?.stack,
    });

    if (exception instanceof ThrottlerException) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).send({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too many requests',
      });
    }
    const payload = isHttp
      ? (exception as HttpException).getResponse()
      : { statusCode: status, message };

    res.status(status).send(payload);
  }
}
