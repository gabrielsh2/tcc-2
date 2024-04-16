import { DataSource } from 'typeorm';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { SubstitutionList } from '@entities';
import { customSubstitutionListRepository } from '@repositories';

export const SUBSTITUTION_LIST_PROVIDER = {
  provide: getRepositoryToken(SubstitutionList),
  inject: [getDataSourceToken()],
  useFactory(datasource: DataSource) {
    return datasource
      .getRepository(SubstitutionList)
      .extend(customSubstitutionListRepository);
  },
};
