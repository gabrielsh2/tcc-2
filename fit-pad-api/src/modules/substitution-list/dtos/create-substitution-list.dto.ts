import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FoodGroupDto } from './food-group.dto';

export class CreateSubstitutionListDto {
  @IsOptional()
  @IsString()
  observations?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FoodGroupDto)
  foodGroups?: FoodGroupDto[];
}
