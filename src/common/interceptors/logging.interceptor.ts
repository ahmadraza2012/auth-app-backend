import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
  
      const startTime = Date.now();
  
      this.logger.log(`Incoming Request: ${method} ${url}`);
      this.logger.log(`Request Headers: ${JSON.stringify(request.headers)}`);
      this.logger.log(`Request Body: ${JSON.stringify(request.body)}`);
      this.logger.log(`Client IP: ${request.ip}`);
  
      return next.handle().pipe(
        tap(() => {
          const elapsedTime = Date.now() - startTime;
          this.logger.log(
            `Request Processed: ${method} ${url} - Completed in ${elapsedTime}ms`,
          );

        }),
      );
    }
  }