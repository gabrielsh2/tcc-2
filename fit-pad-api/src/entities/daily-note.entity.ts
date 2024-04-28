import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Agenda } from './agenda.entity';

@Entity()
export class DailyNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Agenda, (agenda) => agenda.dailyNotes)
  agenda: Agenda;

  constructor(title: string, description: string, agenda: Agenda) {
    this.title = title;
    this.description = description;
    this.agenda = agenda;
  }
}
