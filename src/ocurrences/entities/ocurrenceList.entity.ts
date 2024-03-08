import { ApiProperty } from "@nestjs/swagger";
import { Ocurrence } from "@prisma/client";

type Pagination = {
    page: number,
    limit: number,
    total: number
}

export class OcurrenceListEntity {
    constructor(partial: Partial<OcurrenceListEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    data: Ocurrence[]

    @ApiProperty()
    meta: Pagination
}