import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-dirver.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiPropertyOptional({ example: 'John', description: 'Updated first name of the driver' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Updated last name of the driver' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ example: '44', description: 'Updated driver number' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  driver_number?: string;

  @ApiPropertyOptional({ example: 'USA', description: 'Updated country of the driver' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 170, description: 'height of driver' })
  @IsNotEmpty()
  height: number;
  
  @ApiPropertyOptional({ example: 68, description: 'weight of driver' })
  @IsNotEmpty()
  weight: number;
}
