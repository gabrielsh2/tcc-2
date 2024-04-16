import { NotFoundException } from '@nestjs/common';

export class SubstitutionListNotFoundException extends NotFoundException {
  constructor() {
    super('Lista de Substituição não encontrada!');
  }
}
