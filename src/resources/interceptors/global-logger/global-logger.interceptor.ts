import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { debounceTime, Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequestWithUser } from 'src/modules/authentication/authentication.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(
    private logger: ConsoleLogger
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestWithUser>();
    const response = contextHttp.getResponse<Response>();
    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);
    const instantPreController = Date.now();
    return next.handle().pipe(
      tap(() => {
         if ('user' in request)
          this.logger.log(`endpoint has been access by userId ${request.user.sub}`);

         const timeEndpointExecution = Date.now() - instantPreController;
         this.logger.log(`Response: status ${statusCode} - ${timeEndpointExecution}ms`);
      })
    );
  }
}
