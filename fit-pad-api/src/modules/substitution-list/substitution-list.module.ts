import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FoodGroup, FoodGroupItem, Patient, SubstitutionList } from '@entities';
import { SUBSTITUTION_LIST_PROVIDER } from '@providers';
import { SubstitutionListService } from './substitution-list.service';
import { SubstitutionListController } from './substitution-list.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubstitutionList,
      Patient,
      FoodGroup,
      FoodGroupItem,
    ]),
  ],
  providers: [SUBSTITUTION_LIST_PROVIDER, SubstitutionListService],
  controllers: [SubstitutionListController],
})
export class SubstitutionListModule {}
