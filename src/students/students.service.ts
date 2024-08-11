import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async findStudents() {
        try {
            return this.prisma.student.findMany({
                include: {
                    ocurrences: true
                }
            })
        } catch (e) {
            throw new BadRequestException('Algo deu errado.')
        }
    }

    async create(ra: string, name: string, series: string, sclass: string) {
        try {
            const student = await this.prisma.student.findUnique({ where: { ra: ra } })

            if (student) throw new ConflictException()

            await this.prisma.student.create({
                data: {
                    ra: ra,
                    name: name,
                    class: series + sclass
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
}
