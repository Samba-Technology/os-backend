import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Levels, Student } from '@prisma/client';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OcurrencesService {
    constructor(private prisma: PrismaService) { }

    async create(description: string, level: Levels, students: [], userRole, userId) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode executar essa ação.')
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
}
