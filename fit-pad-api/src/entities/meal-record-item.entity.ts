import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MealRecord } from './meal-record.entity';

@Entity()
export class MealRecordItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  quantity: string;

  @ManyToOne(() => MealRecord, (mealRecord) => mealRecord.mealRecordItems)
  mealRecord: MealRecord;

  constructor(name: string, quantity: string, mealRecord: MealRecord) {
    this.name = name;
    this.quantity = quantity;
    this.mealRecord = mealRecord;
  }
}
