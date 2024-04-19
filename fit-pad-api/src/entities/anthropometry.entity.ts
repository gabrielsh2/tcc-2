import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Anthropometry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  registerDate: Date;

  @Column({ length: 10, nullable: false })
  height: string;

  @Column({ length: 10, nullable: false })
  weight: string;

  @Column({ length: 10, nullable: false })
  bmi: string;

  @Column({ length: 10, nullable: false })
  bodyFat: string;

  @Column({ length: 10, nullable: false })
  bodyFatPercentage: string;

  @Column({ length: 10, nullable: false })
  leanMass: string;

  @Column({ length: 10, nullable: false })
  leanMassPercentage: string;

  @Column({ length: 10, nullable: false })
  bodyDensity: string;

  @Column({ length: 10, nullable: false })
  skinfoldSum: string;

  @Column({ length: 10, nullable: false })
  amb: string;

  @Column({ length: 10, nullable: false })
  agb: string;

  @Column({ length: 10, nullable: false })
  waist: string;

  @Column({ length: 10, nullable: false })
  abdomen: string;

  @Column({ length: 10, nullable: false })
  relaxedRightArm: string;

  @Column({ length: 10, nullable: false })
  contractedRightArm: string;

  @Column({ length: 10, nullable: false })
  triceps: string;

  @Column({ length: 10, nullable: false })
  midaxillary: string;

  @Column({ length: 10, nullable: false })
  chest: string;

  @Column({ length: 10, nullable: false })
  abdominal: string;

  @Column({ length: 10, nullable: false })
  suprailiac: string;

  @Column({ length: 10, nullable: false })
  subscapular: string;

  @Column({ length: 10, nullable: false })
  thigh: string;

  @ManyToOne(() => Patient)
  patient: Patient;
}
