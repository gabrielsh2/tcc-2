import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Diet } from './diet.entity';
import { MealItem } from './meal-item.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  mealType: string;

  @Column({ type: 'time', nullable: true })
  mealTime: string;

  @ManyToOne(() => Diet, (diet) => diet.meals)
  diet: Diet;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal)
  mealItems: MealItem[];

  constructor(mealType: string, mealTime: string, mealItems: MealItem[]) {
    this.mealType = mealType;
    this.mealTime = mealTime;
    this.mealItems = mealItems;
  }
}
