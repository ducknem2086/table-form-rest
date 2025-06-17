import { Module } from '@nestjs/common';
import { ConfigTypeController } from './config-type.controller';
import { ConfigTypeService } from './config-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from './config-type';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigType])],
  controllers: [ConfigTypeController],
  providers: [ConfigTypeService],
})
export class ConfigTypeModule {}
