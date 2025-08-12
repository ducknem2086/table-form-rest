import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IConfigDto, ListConfigQueryDto } from './config.dto';

@Controller('Config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {
  }

  @Get()
  findAll(
    @Query() query: ListConfigQueryDto,
  ) {
    const { page, limit } = query;
    console.log(page, limit);
    return this.configService.getAllConfig(query.page, query.limit);
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
