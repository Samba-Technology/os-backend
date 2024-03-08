import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { isAdmin } from 'src/helpers/authorization';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(name: string, email: string, password: string, userRole: string) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode executar essa ação.')
        try {
            const user = await this.prisma.user.findUnique({ where: { email: email } })

            if (user) throw new ConflictException('Email já cadastrado.')

            await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 15)
                }
            })
            return null
        } catch (e) {
            if (e.status === 409) {
                throw new ConflictException('Conta já existente.')
            }
            throw new BadRequestException('Algo deu errado.')
        }
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } })
    }

    async findUsers(userRole: string, page: number, limit: number) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode executar essa ação.')
        try {
            const total = await this.prisma.user.count()
            const users = await this.prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit
            })

            return ({ data: users, meta: { page: page, limit: limit, total: total } })
        } catch (e) {
            throw new BadRequestException('Algo deu errado.')
        }
    }
}
