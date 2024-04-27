import { NotFoundException } from '@nestjs/common';

export class DailyTaskNotFoundException extends NotFoundException {
  constructor() {
    super('Registro de tarefa não encontrado!');
  }
}
