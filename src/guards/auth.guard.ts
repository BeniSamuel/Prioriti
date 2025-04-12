import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      //** Get Payload from the token if not exception thrown */
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Beni@IsH123',
      });
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error('Error: ', error);
      throw new UnauthorizedException('You are not authorized!!');
      return false;
    }
  }

  extractTokenFromRequest(request: Request): string {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('token not found!!');
    }
    const [type, token] = request.headers.authorization.split(' ');
    if (!type) {
      throw new UnauthorizedException('token not found!!');
    }
    return type === 'Bearer' ? token : null;
  }
}
