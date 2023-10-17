import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { team_name } = createTeamDto;
    const team = new Team();
    team.team_name = team_name;

    return await this.teamRepository.save(team);
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where : {team_id : id}
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.getTeamById(id);

    if (updateTeamDto.team_name) {
      team.team_name = updateTeamDto.team_name;
    }

    return await this.teamRepository.save(team);
  }

  async deleteTeam(id: number): Promise<void> {
    const team = await this.getTeamById(id);
    await this.teamRepository.remove(team);
  }
}