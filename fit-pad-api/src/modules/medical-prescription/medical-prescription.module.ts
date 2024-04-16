import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalPrescription, Patient } from '@entities';
import { MedicalPrescriptionService } from './medical-prescription.service';
import { MedicalPrescriptionController } from './medical-prescription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalPrescription, Patient])],
  providers: [MedicalPrescriptionService],
  controllers: [MedicalPrescriptionController],
})
export class MedicalPrescriptionModule {}
