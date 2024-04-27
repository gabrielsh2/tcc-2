import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from './patient.entity';
import { DailyTask } from './daily-task.entity';

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

  @OneToMany(() => DailyTask, (dailyTask) => dailyTask.task, {
    cascade: true,
  })
  dailyTasks: DailyTask[];

  constructor(title: string, description: string, patient: Patient) {
    this.title = title;
    this.description = description;
    this.patient = patient;
  }
}
