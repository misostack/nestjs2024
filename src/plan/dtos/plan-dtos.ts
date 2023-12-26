import { OmitType } from '@nestjs/swagger';
import { PlanStatus } from '../constants/plan-constants';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class PlanDto {
  id: number;
  name: string;
  description: string;
  status: PlanStatus = PlanStatus.Active;
  startDate: Date;
  dueDate: Date;
  userId: number = null;
}

export class CreatePlanDto extends OmitType(PlanDto, ['id']) {
  @MaxLength(160)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @MaxLength(1000)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsEnum(PlanStatus)
  @IsOptional()
  status: PlanStatus = PlanStatus.Active;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;
}

export class UpdatePlanDto extends OmitType(PlanDto, ['userId']) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @MaxLength(160)
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @MaxLength(1000)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsEnum(PlanStatus)
  @IsOptional()
  status: PlanStatus = PlanStatus.Active;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  dueDate: Date;
}
