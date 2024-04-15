import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: true })
  quantity: string;

  @ManyToOne(() => Meal, (meal) => meal.mealItems)
  meal: Meal;

  constructor(name: string, quantity: string) {
    this.name = name;
    this.quantity = quantity;
  }
}
