import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class StudentDto {
  @IsArray()
  students: [];

  @IsString()
  @IsNotEmpty()
  @Min(10)
  @Max(10)
  @ApiProperty()
  ra: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  series: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sclass: string;
}
