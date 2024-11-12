// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionModule } from './consumption/consumption.module';
import { Consumption } from './consumption/entities/consumption.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'water-consumption.db',
      entities: [Consumption],
      synchronize: true,
    }),
    ConsumptionModule,
  ],
})
export class AppModule {}
