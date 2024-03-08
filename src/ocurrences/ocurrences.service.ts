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

    async assumeOcurrence(ocurrenceId: number, userId: number, userRole: string) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode executar essa ação.')
        try {

            const ocurrence = await this.prisma.ocurrence.update({
                where: {
                    id: ocurrenceId
                },
                data: {
                    responsibleId: userId,
                    status: "ASSUMED"
                },
                include: {
                    user: true,
                    responsible: true,
                    students: true
                }
            })

            return ocurrence
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Algo deu errado.')
        }
    }

    async dispatchOcurrence(ocurrenceId: number, userRole: string, dispatch: string) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode executar essa ação.')
        try {
            const ocurrence = await this.prisma.ocurrence.update({
                where: {
                    id: ocurrenceId
                },
                data: {
                    dispatch: dispatch,
                    status: "WAITING"
                },
                include: {
                    user: true,
                    responsible: true,
                    students: true
                }
            })

            return ocurrence
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Algo deu errado.')
        }
    }
}
