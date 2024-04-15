import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '@entities';
import { customPatientRepository } from '@repositories';

export const PATIENT_PROVIDER = {
  provide: getRepositoryToken(Patient),
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return datasource.getRepository(Patient).extend(customPatientRepository);
  },
};
