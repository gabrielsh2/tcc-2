import { NotFoundException } from '@nestjs/common';

export class DietNotFoundException extends NotFoundException {
  constructor() {
    super('Dieta não encontrada!');
  }
}
