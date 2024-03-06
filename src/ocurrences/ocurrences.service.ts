import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Levels, Student } from '@prisma/client';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OcurrencesService {
    constructor(private prisma: PrismaService) { }

    async create(description: string, level: Levels, students: [], userId) {
        try {
            await this.prisma.ocurrence.create({
                data: {
                    description: description,
                    level: level,
                    userId: userId,
                    students: {
                        connect: students.map((student: Student) => ({ ra: student.ra }))
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Algo deu errado.')
        }
    }

    async findOcurrences(userId: number, userRole: string, page: number, limit: number) {
        try {
            const total = await this.prisma.ocurrence.count({
                ...(isAdmin(userRole) ? null : {
                    where: {
                        userId: userId
                    }
                })
            })

            const ocurrences = await this.prisma.ocurrence.findMany({
                where: {
                    ...(isAdmin(userRole) ? null : { userId: userId })
                },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    students: true,
                    user: true,
                    responsible: true
                }
            })

            return ({ data: ocurrences, meta: { page: page, limit: limit, total: total } })
        } catch (e) {
            throw new BadRequestException('Algo deu errado.')
        }
    }
}
