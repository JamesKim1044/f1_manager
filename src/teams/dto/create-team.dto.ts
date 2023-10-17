import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Example Team', description: 'The name of the team' })
  team_name: string;
}