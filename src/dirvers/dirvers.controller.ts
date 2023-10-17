import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './dirvers.service';
import { CreateDriverDto } from './dto/create-dirver.dto';
import { UpdateDriverDto } from './dto/update-dirver.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('dirvers')
@ApiTags('DRIVER')
export class DirversController {
  constructor(private readonly dirversService: DriverService) {}

  @Post()
  create(@Body() createDirverDto: CreateDriverDto) {
    return this.dirversService.createDriver(createDirverDto);
  }

  @Get()
  findAll() {
    return this.dirversService.getAllDrivers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dirversService.getDriverById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriver: UpdateDriverDto) {
    return this.dirversService.updateDriver(+id, updateDriver);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dirversService.deleteDriver(+id);
  }
}
