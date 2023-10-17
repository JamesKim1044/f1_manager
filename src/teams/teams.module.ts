import { Module } from '@nestjs/common';
import { TeamService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamService],
})
export class TeamsModule {}
