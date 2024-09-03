import { ApiProperty } from '@nestjs/swagger';
import { Levels } from '@prisma/client';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class OccurrenceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dispatch: string;

  @IsBoolean()
  @ApiProperty()
  isEdit: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: Levels;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  students: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  tutors: number[];
}
