import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './business.entity';

@Module({
  providers: [BusinessService],
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessController],
})
export class BusinessModule {}
