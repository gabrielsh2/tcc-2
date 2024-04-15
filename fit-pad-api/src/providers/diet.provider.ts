import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Diet } from '@entities';
import { customDietRepository } from '@repositories';

export const DIET_PROVIDER = {
  provide: getRepositoryToken(Diet),
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return datasource.getRepository(Diet).extend(customDietRepository);
  },
};
