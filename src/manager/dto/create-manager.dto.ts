import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateManagerDto {
  @ApiProperty({ example: 'example@example.com', description: 'Email address of the manager' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password for the manager' })
  @IsNotEmpty()
  @IsString()
  password: string;
}