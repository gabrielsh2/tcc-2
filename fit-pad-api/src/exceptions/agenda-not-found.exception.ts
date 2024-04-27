import { NotFoundException } from '@nestjs/common';

export class AgendaNotFoundException extends NotFoundException {
  constructor() {
    super('Agenda não encontrada!');
  }
}
