import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'james@example.com', description: 'Email address of the manager' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'james123!', description: 'Password' })
  password: string;
}