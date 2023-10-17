import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization']; // Get authorization header

    // Implement your logic to validate the token and user here
    // You can use authService.verifyToken(authorizationHeader) to verify the token

    // If the token is valid, return true; otherwise, return false
    return true;
  }

}