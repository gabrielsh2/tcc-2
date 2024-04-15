import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MealItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  quantity: string;
}
