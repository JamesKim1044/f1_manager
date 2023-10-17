import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ManagerService } from 'src/manager/manager.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.managerService.getMangerByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.manager_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(authorizationHeader: string) {
    try {
      const token = authorizationHeader.replace('Bearer ', ''); // Extract the token from the Authorization header
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
  
}