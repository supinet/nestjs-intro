import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from './authentication.service';
import { JwtService } from '@nestjs/jwt';

export interface RequestWithUser extends Request {
  user: UserPayload;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithUser>();
    const token = this.extractHeaderToken(request);
    if (!token) throw new UnauthorizedException('Authentication error');
    try {
      // veriry the authenticity of jwt and it's at the right user
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      // add the payload on user to get it after,
      // then he goes to access some protected endpoint it will be allowed
      request.user =  payload;
    } catch(error) {
      console.error(error);
      throw new UnauthorizedException('JWT invalid');
    }
    return true;
  }

  private extractHeaderToken(request: Request): string | undefined {
    //Bearer <jwt_token_value>
    //?? coalencese null if authorization is not empty then tranform to empty to avoid crash
    const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
