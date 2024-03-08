import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Ocurrence, Student } from "@prisma/client";

export class OcurrenceEntity implements Ocurrence {
    constructor(partial: Partial<OcurrenceEntity>) {
        Object.assign(this, partial)
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