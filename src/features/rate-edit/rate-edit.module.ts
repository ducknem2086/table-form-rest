import { Module } from '@nestjs/common';
import { RateEditController } from './rate-edit.controller';
import { RateEditService } from './rate-edit.service';

@Module({
  controllers: [RateEditController],
  providers: [RateEditService]
})
export class RateEditModule {}
