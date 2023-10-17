import { Controller , Get, Request, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Get('me')
  @ApiBearerAuth() // Add this decorator
  getProfile(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    
    try {
        const decodedToken = jwt.verify(token, 'your_secret_key');
        // `decodedToken` now contains the payload of the JWT token
        return decodedToken; // Return the decoded token payload
      } catch (error) {
        // Handle token verification error
        throw new UnauthorizedException('Unauthorized'); // Return null or handle the error as appropriate for your application
      }
  }
  

}