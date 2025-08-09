import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();

    this.logger.log(` 🚀 ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap((responseData) => {
        const time = Date.now() - now;
        this.logger.log({
          message: ` ✅ ${request.method} ${request.url} | ⏱️ ${time}ms`,
          data: responseData,
        });
      }),
      catchError((error) => {
        const time = Date.now() - now;

        this.logger.error({
          error: ` ❌ ${request.method} ${request.url} | ❗ Error: ${error.message} | ⏱️ ${time}ms`,
          stack: error.stack,
        });
        return throwError(() => error);
      }),
    );
  }
}
