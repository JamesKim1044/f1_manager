import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateManagerDto {
  @ApiPropertyOptional({ example: 'newpassword123', description: 'Updated password for the manager' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;
}