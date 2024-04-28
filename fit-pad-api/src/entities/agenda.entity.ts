import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Patient } from './patient.entity';
import { DailyTask } from './daily-task.entity';
import { MealRecord } from './meal-record.entity';

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  registerDate: Date;

  @Column({ length: 10, nullable: true })
  moodEmoji: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @OneToMany(() => DailyTask, (dailyTask) => dailyTask.agenda)
  dailyTasks: DailyTask[];

  @OneToMany(() => MealRecord, (mealRecord) => mealRecord.agenda)
  mealRecords: MealRecord[];

  constructor(registerDate: Date, patient: Patient) {
    this.registerDate = registerDate;
    this.patient = patient;
  }
}
