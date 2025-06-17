import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { Config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
