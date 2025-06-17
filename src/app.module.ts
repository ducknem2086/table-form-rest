import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from './features/business/business.module';
import { ConfigModule } from './features/config/config.module';
import { ConfigTypeModule } from './features/config-type/config-type.module';

@Module({
  imports: [
    BusinessModule,
    ConfigModule,
    ConfigTypeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'setup',
      entities: ['**/entity/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      logger: 'advanced-console',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
