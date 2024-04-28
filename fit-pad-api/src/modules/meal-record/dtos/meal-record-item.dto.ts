import { IsNotEmpty, IsString } from 'class-validator';

export class MealRecordItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}
