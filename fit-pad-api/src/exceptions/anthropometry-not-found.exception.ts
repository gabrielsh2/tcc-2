import { NotFoundException } from '@nestjs/common';

export class AnthropometryNotFoundException extends NotFoundException {
  constructor() {
    super('Registro antropométrico não encontrado!');
  }
}
