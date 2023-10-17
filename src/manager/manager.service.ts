import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import {NoNeedToReleaseEntityManagerError, Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    const { password, ...managerData } = createManagerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const manager = this.managerRepository.create({
      ...managerData,
      password: hashedPassword,
    });

    return await this.managerRepository.save(manager);
  }

  async getAllManagers(): Promise<Manager[]> {
    return await this.managerRepository.find();
  }
  
  async getMangerByEmail(eamil: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where : {email : eamil}
    });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${eamil} not found`);
    }
    return manager;
  }

  async getManagerById(managerId: number): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where : {manager_id : managerId}
    });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${managerId} not found`);
    }
    return manager;
  }

  async updateManager(managerId: number, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    const manager = await this.getManagerById(managerId);
    
    if (updateManagerDto.password){
      const hashedPassword = await bcrypt.hash(updateManagerDto.password, 10);
      manager.password = hashedPassword
    }

    return await this.managerRepository.save(manager);
  }

  async deleteManager(managerId: number): Promise<void> {
    const manager = await this.getManagerById(managerId);
    await this.managerRepository.remove(manager);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const manager = await this.managerRepository.findOne({ 
      where : {email : email}
     });

    if (manager && await bcrypt.compare(password, manager.password)) {
      return true; // Passwords match
    }
    return false; // Passwords don't match
  }
}
