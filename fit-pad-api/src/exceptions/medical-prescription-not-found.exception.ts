import { NotFoundException } from '@nestjs/common';

export class MedicalPrescriptionNotFoundException extends NotFoundException {
  constructor() {
    super('Prescrição Médica não encontrada!');
  }
}
