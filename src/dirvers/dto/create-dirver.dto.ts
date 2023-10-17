import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ example: 'John', description: 'First name of the driver' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the driver' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: '44', description: 'Driver number' })
  @IsNotEmpty()
  @IsString()
  driver_number: string;

  @ApiProperty({ example: 'USA', description: 'Country of the driver' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: '1996-11-30', description: 'Date of Birth' })
  @IsNotEmpty()
  @IsString()
  dob: string;
  
  @ApiProperty({ example: 170, description: 'height of driver' })
  @IsNotEmpty()
  height: number;
  
  @ApiProperty({ example: 68, description: 'weight of driver' })
  @IsNotEmpty()
  weight: number;

  // Note: `registered_date` and `update_date` are auto-generated in the database, 
  // so you don't need to include them in the DTO for creation.

  @ApiProperty({ example: 1, description: 'ID of the team to which the driver belongs' })
  @IsNotEmpty()
  team_id: number;
}