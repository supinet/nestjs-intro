import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { RequestWithUser } from 'src/modules/authentication/authentication.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(
    private logger: ConsoleLogger
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestWithUser>();
    return next.handle().pipe(
      tap(() => {
         if ('user' in request)
          this.logger.log(`endpoint has been access by userId ${request.user.sub}`);
      })
    );
  }
}
