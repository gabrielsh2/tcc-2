import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Nutritionist } from '@entities';
import { customNutritionistRepository } from '@repositories';

export const NUTRITIONIST_PROVIDER = {
  provide: getRepositoryToken(Nutritionist),
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return datasource
      .getRepository(Nutritionist)
      .extend(customNutritionistRepository);
  },
};
