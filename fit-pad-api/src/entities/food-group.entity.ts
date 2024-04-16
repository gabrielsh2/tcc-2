import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SubstitutionList } from './substitution-list.entity';
import { FoodGroupItem } from './food-group-item.entity';

@Entity()
export class FoodGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @ManyToOne(
    () => SubstitutionList,
    (substitutionList) => substitutionList.foodGroups,
  )
  @JoinColumn({ name: 'substitution_list_id' })
  substitutionList: SubstitutionList;

  @OneToMany(() => FoodGroupItem, (foodGroupItem) => foodGroupItem.foodGroup)
  items: FoodGroupItem[];

  constructor(name: string, items: FoodGroupItem[]) {
    this.name = name;
    this.items = items;
  }
}
