import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('float')
  amount: number;

  @Column('date')
  date: Date;
}
