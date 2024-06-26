import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class MedicalPrescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
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
