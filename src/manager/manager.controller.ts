import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { ApiTags } from '@nestjs/swagger';
import { ManagerResponseDto } from './dto/response-manager.dto';

@ApiTags('MANAGER')
@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  
  private buildResponseObject(manager: Manager): ManagerResponseDto {
    const { email, manager_id } = manager;
    return { email, manager_id };
  }
  
  @Post()
  async createManager(@Body() createManagerDto: CreateManagerDto): Promise<ManagerResponseDto> {
    const createdManager: Manager = await this.managerService.createManager(createManagerDto);
    return this.buildResponseObject(createdManager);
  }
  
  @Get()
  async getAllManagers(): Promise<ManagerResponseDto[]> {
    const managers = await this.managerService.getAllManagers();
    return managers.map(manager => this.buildResponseObject(manager));
  }

  @Get(':id')
  async getManagerById(@Param('id') id: number): Promise<ManagerResponseDto> {
    const manager = await this.managerService.getManagerById(id);
    return this.buildResponseObject(manager);
  }

  @Patch(':id')
  async updateManager(@Param('id') id: number, @Body() updateManagerDto: UpdateManagerDto): Promise<ManagerResponseDto> {
    const manager = await this.managerService.updateManager(id, updateManagerDto);
    return this.buildResponseObject(manager);
  }

  @Delete(':id')
  deleteManager(@Param('id') id: number): Promise<void> {
    return this.managerService.deleteManager(id);
  }
}