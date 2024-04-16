import { IsOptional, IsString } from 'class-validator';

export class FoodGroupItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  quantity?: string;
}
