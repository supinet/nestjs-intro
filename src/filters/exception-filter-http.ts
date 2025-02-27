import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";
import { request } from "http";
import { timestamp } from "rxjs";

@Catch()
export class FilterExceptionHttp implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {
        console.log(exception);
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();

        const { status, body } = 
            exception instanceof HttpException ?
                {
                    status: exception.getStatus(),
                    body: exception.getResponse()
                } :
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    }
                };

        response.status(status).json(body);
    }

}