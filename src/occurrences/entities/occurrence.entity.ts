import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Ocurrence } from '@prisma/client';

export class OccurrenceEntity implements Ocurrence {
  constructor(partial: Partial<OccurrenceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  responsibleId: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dispatch: string;

  @ApiProperty()
  level: $Enums.Levels;

  @ApiProperty()
  status: $Enums.Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
