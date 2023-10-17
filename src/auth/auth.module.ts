import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ManagerModule } from 'src/manager/manager.module';
import { AuthController } from './auth.controller';
import { ManagerService } from 'src/manager/manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { PassportModule } from '@nestjs/passport/dist';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '1h' },
          }),
    
      TypeOrmModule.forFeature([Manager]),
      ManagerModule, // Include ManagerModule here

    ],
    providers: [AuthService, ManagerService],
    controllers: [AuthController],
  })
  export class AuthModule {}