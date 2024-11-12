import { Injectable } from '@nestjs/common';
import { Between, FindOperator, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionRepository } from '../consumption/consumption.repository';
import { Consumption } from './entities/consumption.entity';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private consumptionRepository: ConsumptionRepository,
  ) { }

  // Função para registrar o consumo
  async registerConsumption(userId: string, amount: number, date: Date): Promise<Consumption> {
    const consumption = this.consumptionRepository.create({ userId, amount, date });
    return this.consumptionRepository.save(consumption);
  }

  
  // Função para consultar o histórico de consumo
  async getConsumptionHistory(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Consumption[]> {
    return this.consumptionRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate), // Alterado para o operador correto
      },
    });
  }

  // Função para gerar alertas de consumo elevado
  async checkConsumptionAlert(userId: string): Promise<string> {
    const [lastMonthConsumption, currentMonthConsumption] = await this.consumptionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
      take: 2,
    });

    if (!lastMonthConsumption) {
      return 'Não há dados suficientes para comparação.';
    }

    if (currentMonthConsumption && currentMonthConsumption.amount > lastMonthConsumption.amount) {
      return `Alerta: Você excedeu o consumo do mês anterior.`;
    }

    return 'Seu consumo está dentro dos limites.';
  }
}