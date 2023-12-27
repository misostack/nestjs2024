import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

enum ExampleStatus {
  Active = 1,
  InActive = 2,
}

class ExampleLinkDto {
  id: number;

  @MaxLength(160)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}

class CreateExampleLinkDto extends OmitType(ExampleLinkDto, ['id']) {}

class ExampleDto {
  @IsNotEmpty()
  id: number;

  @MaxLength(160)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsEnum(ExampleStatus)
  @IsOptional()
  status: ExampleStatus.Active;

  @ValidateNested({ each: true })
  @Type(() => ExampleLinkDto)
  @ArrayMinSize(1)
  @IsArray()
  links: CreateExampleLinkDto[] = [];
}

class CreateExampleDto extends OmitType(ExampleDto, ['id']) {}

export { ExampleDto, CreateExampleDto };
