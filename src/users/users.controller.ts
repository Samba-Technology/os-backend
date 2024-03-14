import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/request';
import { UserListEntity } from './entities/userList.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: UserEntity })
    async create(
        @Body() { name, email, password }: CreateUserDto,
        @Request() req: RequestWithUser
    ) {
        return this.usersService.create(name, email, password, req.user.role)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserListEntity })
    async getUsers(
        @Request() req: RequestWithUser,
        @Query() query: any
    ) {
        return await this.usersService.findUsers(req.user.role, parseInt(query.page), parseInt(query.limit), query.queryUser)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    async findMe(@Request() req: RequestWithUser) {
        const user = await this.usersService.findOne(req.user.id)
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.')
        }
        return new UserEntity(user)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEntity })
    async deleteUser(
        @Param('id') id: string,
        @Request() req: RequestWithUser
    ) {
        return this.usersService.deleteUser(id, req.user.role)
    }
}
