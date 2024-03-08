import { ApiProperty } from "@nestjs/swagger";
import { Levels } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class OcurrenceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dispatch: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: Levels;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  students: [];
}