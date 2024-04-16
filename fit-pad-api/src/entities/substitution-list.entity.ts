import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { FoodGroup } from './food-group.entity';

@Entity()
export class SubstitutionList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @OneToOne(() => Patient, (patient) => patient.substitutionList)
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => FoodGroup, (foodGroup) => foodGroup.substitutionList)
  foodGroups: FoodGroup[];

  constructor(observations: string, patient: Patient, foodGroups: FoodGroup[]) {
    this.observations = observations;
    this.patient = patient;
    this.foodGroups = foodGroups;
  }
}
