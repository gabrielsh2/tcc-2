import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnthropometryDto {
  @IsNotEmpty()
  @IsDateString()
  registerDate: Date;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsNotEmpty()
  @IsString()
  bmi: string;

  @IsNotEmpty()
  @IsString()
  bodyFat: string;

  @IsNotEmpty()
  @IsString()
  bodyFatPercentage: string;

  @IsNotEmpty()
  @IsString()
  leanMass: string;

  @IsNotEmpty()
  @IsString()
  leanMassPercentage: string;

  @IsNotEmpty()
  @IsString()
  bodyDensity: string;

  @IsNotEmpty()
  @IsString()
  skinfoldSum: string;

  @IsNotEmpty()
  @IsString()
  amb: string;

  @IsNotEmpty()
  @IsString()
  agb: string;

  @IsNotEmpty()
  @IsString()
  waist: string;

  @IsNotEmpty()
  @IsString()
  abdomen: string;

  @IsNotEmpty()
  @IsString()
  relaxedRightArm: string;

  @IsNotEmpty()
  @IsString()
  contractedRightArm: string;

  @IsNotEmpty()
  @IsString()
  triceps: string;

  @IsNotEmpty()
  @IsString()
  midaxillary: string;

  @IsNotEmpty()
  @IsString()
  chest: string;

  @IsNotEmpty()
  @IsString()
  abdominal: string;

  @IsNotEmpty()
  @IsString()
  suprailiac: string;

  @IsNotEmpty()
  @IsString()
  subscapular: string;

  @IsNotEmpty()
  @IsString()
  thigh: string;
}
