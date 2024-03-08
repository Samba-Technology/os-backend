import { ApiProperty } from "@nestjs/swagger";
import { Student } from "@prisma/client";

export class StudentsEntity implements Student {
    constructor(partial: Partial<StudentsEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    ra: string

    @ApiProperty()
    name: string

    @ApiProperty()
    class: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}