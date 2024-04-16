import { Module } from '@nestjs/common';
import { MedicalPrescriptionService } from './medical-prescription.service';
import { MedicalPrescriptionController } from './medical-prescription.controller';

@Module({
  providers: [MedicalPrescriptionService],
  controllers: [MedicalPrescriptionController]
})
export class MedicalPrescriptionModule {}
