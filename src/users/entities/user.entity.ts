import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: $Enums.Role;

    password: string;
}