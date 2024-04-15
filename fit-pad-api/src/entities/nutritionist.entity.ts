import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Nutritionist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  userPassword: string;

  @OneToMany(() => Patient, (patient) => patient.nutritionist)
  patients: Patient[];
}
