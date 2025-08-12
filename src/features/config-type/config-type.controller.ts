import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ConfigTypeService } from './config-type.service';
import { ConfigType } from './config-type';
import { DeleteConfigTypesDto } from './config-type.dto';

@Controller('ConfigType')
export class ConfigTypeController {
  constructor(private readonly configTypeService: ConfigTypeService) {
  }


  @Get()
  findByQuery(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.configTypeService.findByQuery(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configTypeService.findOne(id);
  }

  @Put('mock-data')
  mockData() {
    return this.configTypeService.mock1mRecord();
  }

  @Post()
  createConfigType(@Body() body: { name: string }) {
    return this.configTypeService.createConfigType(body.name);
  }

  @Patch()
  updateConfigType(@Param('id') id: string, @Body() body: { name: string }) {
    return this.configTypeService.updateConfigType(id, body.name);
  }
  @Delete('deleteMany')
  async deleteMany(@Body() dto: DeleteConfigTypesDto) {
    console.log('trigger_____')
    return this.configTypeService.deleteConfigTypesByIdsPg(dto.ids);
  }
  @Delete('delete:id')
  deleteConfigType(@Param('id') id: string) {
    return this.configTypeService.deleteConfigType(id);
  }


}
