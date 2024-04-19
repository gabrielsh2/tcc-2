import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAnthropometryDto {
  @IsOptional()
  @IsDateString()
  registerDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  height?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  weight?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bmi?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bodyFat?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bodyFatPercentage?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  leanMass?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  leanMassPercentage?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bodyDensity?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  skinfoldSum?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  amb?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  agb?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  waist?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  abdomen?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  relaxedRightArm?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contractedRightArm?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  triceps?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  midaxillary?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  chest?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  abdominal?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  suprailiac?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subscapular?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  thigh?: string;
}
