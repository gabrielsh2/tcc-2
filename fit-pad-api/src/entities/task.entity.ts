import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  constructor(title: string, description: string, patient: Patient) {
    this.title = title;
    this.description = description;
    this.patient = patient;
  }
}
