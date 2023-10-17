import { Module } from '@nestjs/common';
import { DriverService } from './dirvers.service';
import { DirversController } from './dirvers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/dirver.entity';
import { Team } from 'src/teams/entities/team.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Driver,Team])],
  controllers: [DirversController],
  providers: [DriverService],
})
export class DirversModule {}
