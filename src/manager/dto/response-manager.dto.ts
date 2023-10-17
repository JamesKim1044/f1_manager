import { ApiProperty } from '@nestjs/swagger';

export class ManagerResponseDto {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    manager_id: number;
  }