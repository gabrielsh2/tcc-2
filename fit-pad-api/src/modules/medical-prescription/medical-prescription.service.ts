import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalPrescription, Patient } from '@entities';
import {
  MedicalPrescriptionNotFoundException,
  PatientNotFoundException,
} from '@exceptions';
import {
  CreateMedicalPrescriptionDto,
  UpdateMedicalPrescriptionDto,
} from './dtos';

@Injectable()
export class MedicalPrescriptionService {
  constructor(
    @InjectRepository(MedicalPrescription)
    private readonly medicalPrescriptionRepository: Repository<MedicalPrescription>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(
    patientId: number,
    createMedicalPrescriptionDto: CreateMedicalPrescriptionDto,
  ): Promise<void> {
    const { title, description } = createMedicalPrescriptionDto;

    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    const medicalPrescription = new MedicalPrescription(
      title,
      description,
      patient,
    );

    await this.medicalPrescriptionRepository.save(medicalPrescription);
  }

  async edit(
    prescriptionId: number,
    updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto,
  ): Promise<void> {
    const { description, title } = updateMedicalPrescriptionDto;

    const medicalPrescription = await this.medicalPrescriptionRepository
      .findOneByOrFail({ id: prescriptionId })
      .catch(() => {
        throw new MedicalPrescriptionNotFoundException();
      });

    medicalPrescription.title = title;
    medicalPrescription.description = description;

    await this.medicalPrescriptionRepository.save(medicalPrescription);
  }

  async delete(prescriptionId: number): Promise<void> {
    const medicalPrescription = await this.medicalPrescriptionRepository
      .findOneByOrFail({ id: prescriptionId })
      .catch(() => {
        throw new MedicalPrescriptionNotFoundException();
      });

    await this.medicalPrescriptionRepository.remove(medicalPrescription);
  }

  async findAllByPatientId(patientId: number): Promise<MedicalPrescription[]> {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return (
      this.medicalPrescriptionRepository.find({
        where: { patient },
      }) || []
    );
  }
}
