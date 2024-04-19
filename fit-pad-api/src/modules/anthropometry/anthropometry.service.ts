import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anthropometry, Patient } from '@entities';
import {
  AnthropometryNotFoundException,
  PatientNotFoundException,
} from '@exceptions';
import { CreateAnthropometryDto, UpdateAnthropometryDto } from './dtos';

@Injectable()
export class AnthropometryService {
  constructor(
    @InjectRepository(Anthropometry)
    private readonly anthropometryRepository: Repository<Anthropometry>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(
    patientId: number,
    createAnthropometryDto: CreateAnthropometryDto,
  ): Promise<void> {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    const anthropometry = this.anthropometryRepository.create({
      ...createAnthropometryDto,
      patient,
    });

    await this.anthropometryRepository.save(anthropometry);
  }

  async update(
    anthropometryId: number,
    updateAnthropometryDto: UpdateAnthropometryDto,
  ): Promise<void> {
    const anthropometry = await this.anthropometryRepository
      .findOneByOrFail({
        id: anthropometryId,
      })
      .catch(() => {
        throw new AnthropometryNotFoundException();
      });

    await this.anthropometryRepository.update(
      anthropometry,
      updateAnthropometryDto,
    );
  }

  async findAllByPatient(patientId: number): Promise<Anthropometry[]> {
    const patient = await this.patientRepository
      .findOneByOrFail({
        id: patientId,
      })
      .catch(() => {
        throw new PatientNotFoundException();
      });

    return this.anthropometryRepository.find({ where: { patient } }) || [];
  }
}
