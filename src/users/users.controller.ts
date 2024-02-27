import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() { name, email, password }: CreateUserDto) {
        return this.usersService.create(name, email, password)
    }
}
