import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { IConfigDto } from './config.dto';

@Controller('Config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  findAll() {
    return this.configService.getAllConfig();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configService.findOne(id);
  }

  @Post()
  create(@Body() createConfig: IConfigDto) {
    return this.configService.createConfig(createConfig);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configService.deleteConfig(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfig: IConfigDto) {
    return this.configService.updateConfig(id, updateConfig);
  }
}
