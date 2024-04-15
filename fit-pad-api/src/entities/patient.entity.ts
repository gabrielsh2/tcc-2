import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Nutritionist } from './nutritionist.entity';
import { Diet } from './diet.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  userPassword: string;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.patients)
  nutritionist: Nutritionist;

  @OneToMany(() => Diet, (diet) => diet.patient)
  diets: Diet[];
}
