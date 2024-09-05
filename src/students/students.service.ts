import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findStudents() {
    try {
      const students = await this.prisma.student.findMany({
        include: {
          ocurrences: true,
        },
      });

      return students.sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async create(ra: string, name: string, series: string, sclass: string) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { ra: ra },
      });

      if (student) throw new ConflictException();

      const formattedName = name
        .toLocaleLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      await this.prisma.student.create({
        data: {
          ra: ra,
          name: formattedName,
          class: series + sclass,
        },
      });
      return null;
    } catch (e) {
      if (e.status === 409) {
        throw new ConflictException('Aluno já existente.');
      }
      throw new BadRequestException('Algo deu errado.');
    }
  }
}
