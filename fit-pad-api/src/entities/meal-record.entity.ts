import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diet } from './diet.entity';
import { Agenda } from './agenda.entity';
import { MealRecordItem } from './meal-record-item.entity';

@Entity()
export class MealRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  mealType: string;

  @Column({ type: 'time', nullable: true })
  mealTime: string;

  @ManyToOne(() => Diet, (diet) => diet.mealRecords)
  diet: Diet;

  @ManyToOne(() => Agenda, (agenda) => agenda.mealRecords)
  agenda: Agenda;

  @OneToMany(() => MealRecordItem, (item) => item.mealRecord)
  mealRecordItems: MealRecordItem[];

  constructor(mealType: string, mealTime: string, agenda: Agenda) {
    this.mealType = mealType;
    this.mealTime = mealTime;
    this.agenda = agenda;
  }
}
