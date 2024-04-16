import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MedicalPrescription } from '@entities';
import {
  CreateMedicalPrescriptionDto,
  UpdateMedicalPrescriptionDto,
} from './dtos';
import { MedicalPrescriptionService } from './medical-prescription.service';

@Controller('medical-prescription')
export class MedicalPrescriptionController {
  constructor(
    private readonly medicalPrescriptionService: MedicalPrescriptionService,
  ) {}

  @Post('/patient/:patientId')
  async create(
    @Param('patientId') patientId: number,
    @Body() createMedicalPrescriptionDto: CreateMedicalPrescriptionDto,
  ) {
    return this.medicalPrescriptionService.create(
      patientId,
      createMedicalPrescriptionDto,
    );
  }

  @Put('/:prescriptionId')
  async edit(
    @Param('prescriptionId') prescriptionId: number,
    @Body() updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto,
  ) {
    return this.medicalPrescriptionService.edit(
      prescriptionId,
      updateMedicalPrescriptionDto,
    );
  }

  @Delete(':prescriptionId')
  async delete(@Param('prescriptionId') prescriptionId: number): Promise<void> {
    return this.medicalPrescriptionService.delete(prescriptionId);
  }

  @Get('/patient/:patientId')
  async findAllByPatientId(
    @Param('patientId') patientId: number,
  ): Promise<MedicalPrescription[]> {
    return this.medicalPrescriptionService.findAllByPatientId(patientId);
  }
}
