import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ConfigTypeService } from './config-type.service';
import { ConfigType } from './config-type';

@Controller('ConfigType')
export class ConfigTypeController {
  constructor(private readonly configTypeService: ConfigTypeService) {}

  @Get()
  findAll(): Promise<ConfigType[]> {
    return this.configTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configTypeService.findOne(id);
  }

  @Post()
  createConfigType(@Body() body: { name: string }) {
    return this.configTypeService.createConfigType(body.name);
  }

  @Patch()
  updateConfigType(@Param('id') id: string, @Body() body: { name: string }) {
    return this.configTypeService.updateConfigType(id, body.name);
  }

  @Delete(':id')
  deleteConfigType(@Param('id') id: string) {
    return this.configTypeService.deleteConfigType(id);
  }
}
