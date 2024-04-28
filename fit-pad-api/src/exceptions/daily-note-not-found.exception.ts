import { NotFoundException } from '@nestjs/common';

export class DailyNoteNotFoundException extends NotFoundException {
  constructor() {
    super('Anotação não encontrada!');
  }
}
