import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isAdmin } from 'src/helpers/authorization';
import { nameFormatter } from 'src/helpers/formatter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findStudents(page: number, limit: number, queryStudent: string) {
    try {
      const total = await this.prisma.student.count({
        where: {
          ...(queryStudent && { ra: queryStudent }),
        },
      });

      const students = await this.prisma.student.findMany({
        where: {
          ...(queryStudent && { ra: queryStudent }),
        },
        include: {
          ocurrences: true,
        },
        ...(page && limit && { skip: (page - 1) * limit, take: limit }),
      });

      return {
        data: students.sort((a, b) => a.name.localeCompare(b.name)),
        meta: { page: page, limit: limit, total: total },
      };
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async create(ra: string, name: string, series: string, sclass: string) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { ra: ra },
      });

      if (student) throw new ConflictException('Aluno já existente.');

      await this.prisma.student.create({
        data: {
          ra: ra,
          name: nameFormatter(name),
          class: series + sclass,
        },
      });
      return null;
    } catch (e) {
      throw e;
    }
  }

  async edit(
    studentRA: string,
    name: string,
    series: string,
    sclass: string,
    userRole: string,
  ) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          ra: studentRA,
        },
      });

      if (!student)
        throw new BadRequestException('Nenhum estudante foi encontrado.');

      await this.prisma.student.update({
        where: {
          ra: studentRA,
        },
        data: {
          name: nameFormatter(name),
          class: series + sclass,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
