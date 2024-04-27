import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '@enums';
import { Task } from './task.entity';
import { Agenda } from './agenda.entity';

@Entity()
export class DailyTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: true,
    default: null,
  })
  status: string;

  @ManyToOne(() => Task, (task) => task.dailyTasks)
  task: Task;

  @ManyToOne(() => Agenda, (agenda) => agenda.dailyTasks)
  agenda: Agenda;

  constructor(status: TaskStatus, agenda: Agenda, task: Task) {
    this.status = status;
    this.agenda = agenda;
    this.task = task;
  }
}
