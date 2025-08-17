// all-exceptions.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

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

    this.logger.error(
      `exception.filter.service: (${status}) ${req.method} ${req.url} - ${message}`,
      !ignoredRoutes.includes(req?.url) && (exception as Error)?.stack,
    );

    const payload = isHttp
      ? (exception as HttpException).getResponse()
      : { statusCode: status, message };

    // Fastify
    res.status(status).send(payload);
  }
}
