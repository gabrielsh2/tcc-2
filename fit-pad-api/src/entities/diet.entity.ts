import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Meal } from './meal.entity';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  observations: string;

  @ManyToOne(() => Patient, (patient) => patient.diets)
  patient: Patient;

  @OneToMany(() => Meal, (meal) => meal.diet)
  meals: Meal[];

  constructor(
    name: string,
    observations: string,
    patient: Patient,
    meals: Meal[],
  ) {
    this.name = name;
    this.observations = observations;
    this.patient = patient;
    this.meals = meals;
  }
}
