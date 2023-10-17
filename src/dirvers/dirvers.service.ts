import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-dirver.dto';
import { UpdateDriverDto } from './dto/update-dirver.dto';
import { Driver } from './entities/dirver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const { team_id, ...driverData } = createDriverDto;
    const team = await this.teamRepository.findOne({
      where : {team_id : team_id}
    });
    if (!team) {
      throw new Error(`Team with ID ${team_id} not found`);
    }
    // Check if the team with provided ID exists
    const driver = this.driverRepository.create({
      ...driverData,
      team,
    });

    return await this.driverRepository.save(driver);
  }

  async getAllDrivers(): Promise<Driver[]> {
    return await this.driverRepository.find();
  }

  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where : {driver_id : id}
    });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async updateDriver(id: number, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.getDriverById(id);
    Object.assign(driver, updateDriverDto);
    return await this.driverRepository.save(driver);
  }

  async deleteDriver(id: number): Promise<void> {
    const driver = await this.getDriverById(id);
    await this.driverRepository.remove(driver);
  }
}