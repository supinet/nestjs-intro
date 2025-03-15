import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
  sub: string;
  userName: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    const userAuthenticated = await bcrypt.compare(
      password,
      user.password
    );

    if (!userAuthenticated)
      throw new UnauthorizedException(`email or password are invalid`);

    const payload: UserPayload = {
      sub: user.id, //subject
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }


}
