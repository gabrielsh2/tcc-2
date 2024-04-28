import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsTimeFormat } from '@decorators';
import { MealRecordItemDto } from './meal-record-item.dto';

export class UpdateMealRecordDto {
  @IsOptional()
  @IsString()
  mealType: string;

  @IsTimeFormat()
  mealTime: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealRecordItemDto)
  mealItems: MealRecordItemDto[];
}
