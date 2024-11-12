import { EntityRepository, Repository } from 'typeorm';
import { Consumption } from './entities/consumption.entity';

@EntityRepository(Consumption)
export class ConsumptionRepository extends Repository<Consumption> {}
