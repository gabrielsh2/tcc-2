import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodGroupItemDto } from './food-group-item.dto';

export class FoodGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodGroupItemDto)
  items: FoodGroupItemDto[];
}
