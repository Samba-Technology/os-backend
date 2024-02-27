import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(name: string, email: string, password: string) {
        try {
            const user = await this.prisma.user.findUnique({where: {email: email}})

            if (user) {
                throw new ConflictException('Email já cadastrado.')
            }

            await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 15)
                }
            })
            return null
        } catch (e) {
            if(e.status === 409) {
                throw new ConflictException('Conta já existente.')
            }
            throw new BadRequestException('Algo deu errado.')
        }
    }

    finOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } })
    }
}
