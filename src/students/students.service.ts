import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async findStudents(userRole: string) {
        if (!isAdmin(userRole)) throw new UnauthorizedException('Você não pode execultar essa ação')
        try {
            return this.prisma.student.findMany()
        } catch (e) {
            throw new BadRequestException('Algo deu errado.')
        }
    }
}
