import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { DefaultLogger } from '@shared/services/logger.service';

import { FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new DefaultLogger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const now = Date.now();
    const uuid = Math.random().toString(36).substring(2, 15);

    request.headers['x-request-id'] = uuid;

    this.logger.init({
      message: ` 🚀 [ID- ${uuid}] ${request.method} ${request.url}`,
      objects: {
        headers: request.headers,
        params: request.params,
        query: request.query,
        body: request.body,
      },
    });

    return next.handle().pipe(
      tap((responseData) => {
        const time = Date.now() - now;
        this.logger.end({
          message: ` ✅ [ID- ${uuid}] ${request.method} ${request.url} | ⏱️ ${time}ms`,
          objects: responseData,
        });
      }),
    );
  }
}
