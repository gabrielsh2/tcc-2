import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsTimeFormat } from '@decorators';
import { Type } from 'class-transformer';
import { MealItemDto } from './diets.meal-item.dto';

export class MealDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  @IsTimeFormat()
  mealTime: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MealItemDto)
  items: MealItemDto[];
}
