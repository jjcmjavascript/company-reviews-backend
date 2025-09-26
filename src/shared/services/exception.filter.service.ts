// all-exceptions.filter.ts
import {
  ArgumentsHost,
  BadRequestException,
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
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();

    const uuid = req.headers['x-request-id'] || '';

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = isHttp
      ? (exception as HttpException).message
      : 'Internal server error';

    const ignoredRoutes = ['/is_logged'];

    // Manejo específico para Throttler (rate limiting)
    if (exception instanceof ThrottlerException) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).send({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too many requests',
      });
    }

    // Esto es para manejar los errores arrojados por class-validator
    if (exception instanceof BadRequestException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && res['message']) {
        if (Array.isArray(res['message'])) {
          message = `${message}: ${res['message'].join(', ')}`;
        }
      }
    }

    const payload = isHttp
      ? (exception as HttpException).getResponse()
      : { statusCode: status, message };

    this.logger.error({
      message: `❌❌❌ [ID- ${uuid}] exception.filter.service: (${status}) ${req.method} ${req.url} - ${message}`,
      stack: !ignoredRoutes.includes(req?.url) && (exception as Error)?.stack,
    });

    res.status(status).send(payload);
  }
}
