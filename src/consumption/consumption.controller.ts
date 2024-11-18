import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { Consumption } from './entities/consumption.entity';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  // Registrar consumo
  @Post('register')
  async registerConsumption(
    @Body() body: { userId: string; amount: number; date: string },
  ): Promise<Consumption> {
    const { userId, amount, date } = body;
    const consumptionDate = new Date(date); // Converter para formato de data
    return this.consumptionService.registerConsumption(userId, amount, consumptionDate);
  }

  // Consultar histórico de consumo
  @Get('history')
  async getConsumptionHistory(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Consumption[]> {
    const start = new Date(startDate); // Converter para formato de data
    const end = new Date(endDate);
    return this.consumptionService.getConsumptionHistory(userId, start, end);
  }

  // Gerar alerta de consumo elevado
  @Get('alert')
  async checkConsumptionAlert(@Query('userId') userId: string): Promise<string> {
    return this.consumptionService.checkConsumptionAlert(userId);
  }

}
