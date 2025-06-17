import { Module } from '@nestjs/common';
import { ConfigEditController } from './config-edit.controller';
import { ConfigEditService } from './config-edit.service';

@Module({
  controllers: [ConfigEditController],
  providers: [ConfigEditService]
})
export class ConfigEditModule {}
