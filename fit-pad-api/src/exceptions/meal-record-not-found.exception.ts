import { NotFoundException } from '@nestjs/common';

export class MealRecordNotFoundException extends NotFoundException {
  constructor() {
    super('Registro de refeição não encontrado!');
  }
}
