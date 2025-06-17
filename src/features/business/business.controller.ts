import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './business.entity';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  update(@Body() update: Business) {
    return this.businessService.updateBusiness(update);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.businessService.removeBusiness(id);
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.businessService.createBusiness(body.name);
  }
}
