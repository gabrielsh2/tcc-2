import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FoodGroup } from './food-group.entity';

@Entity()
export class FoodGroupItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 30, nullable: true })
  quantity: string;

  @ManyToOne(() => FoodGroup, (foodGroup) => foodGroup.items)
  @JoinColumn({ name: 'food_group_id' })
  foodGroup: FoodGroup;

  constructor(name: string, quantity: string) {
    this.name = name;
    this.quantity = quantity;
  }
}
