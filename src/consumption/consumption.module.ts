// src/consumption/consumption.module.ts
import { Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from './entities/consumption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption])], // Registrar o repositório aqui
  providers: [ConsumptionService],
  controllers: [ConsumptionController],
})
export class ConsumptionModule {}
