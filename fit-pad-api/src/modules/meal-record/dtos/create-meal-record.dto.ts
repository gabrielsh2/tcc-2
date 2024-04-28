import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { IsTimeFormat } from '@decorators';
import { MealRecordItemDto } from './meal-record-item.dto';

export class CreateMealRecordDto {
  @IsNotEmpty()
  @IsString()
  mealType: string;

  @IsTimeFormat()
  mealTime: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealRecordItemDto)
  mealItems: MealRecordItemDto[];
}
