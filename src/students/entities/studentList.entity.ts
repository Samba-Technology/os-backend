import { ApiProperty } from "@nestjs/swagger";
import { Student } from "@prisma/client";

export class StudentListEntity implements Student {
    constructor(partial: Partial<StudentListEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    class: string;

    ra: string

    createdAt: Date;

    updatedAt: Date;
}