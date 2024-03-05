import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";

type Pagination = {
    page: number,
    limit: number,
    total: number
}

export class UserListEntity {
    constructor(partial: Partial<UserListEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    data: User[]

    @ApiProperty()
    meta: Pagination
}