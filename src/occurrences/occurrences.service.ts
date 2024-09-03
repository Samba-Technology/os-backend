import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Levels } from '@prisma/client';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';
import { OccurrencesGateway } from './occurrences.gateway';

@Injectable()
export class OccurrencesService {
  constructor(
    private prisma: PrismaService,
    private occurrenceGateway: OccurrencesGateway,
  ) {}

  async create(
    description: string,
    level: Levels,
    students: string[],
    userId,
    tutors: number[],
  ) {
    try {
      const occurrence = await this.prisma.ocurrence.create({
        data: {
          description: description,
          level: level,
          userId: userId,
          students: {
            connect: students.map((ra: string) => ({ ra: ra })),
          },
          tutors: {
            connect: tutors.map((id: number) => ({ id: id })),
          },
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyNewOccurrence(occurrence);
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async editOccurrence(
    occurrenceId: number,
    userId: number,
    description: string,
    level: Levels,
    students: string[],
    tutors: number[],
  ) {
    try {
      const verify = await this.prisma.ocurrence.findUnique({
        where: {
          id: occurrenceId,
        },
      });

      if (verify.userId != userId)
        throw new UnauthorizedException('Você não pode execultar essa ação.');

      const occurrence = await this.prisma.ocurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          description: description,
          level: level,
          students: {
            set: students.map((ra: string) => ({ ra: ra })),
          },
          tutors: {
            connect: tutors.map((id: number) => ({ id: id })),
          },
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyEditOccurrence(occurrence);
      return occurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async findOccurrences(
    userId: number,
    userRole: string,
    page: number,
    limit: number,
    isArchive: string,
    queryStudent: string,
    queryUser: number,
    queryClass: string,
  ) {
    try {
      const where: any = {
        ...(isAdmin(userRole) ? null : { userId: userId }),
        ...(queryStudent && { students: { some: { ra: queryStudent } } }),
        ...(queryUser && { userId: queryUser }),
        ...(queryClass && { students: { some: { class: queryClass } } }),
        ...(isArchive === 'true'
          ? {
              OR: [{ status: 'RESOLVED' }, { status: 'CANCELED' }],
            }
          : {
              NOT: {
                OR: [{ status: 'RESOLVED' }, { status: 'CANCELED' }],
              },
            }),
      };

      const total = await this.prisma.ocurrence.count({
        where: where,
      });

      const occurrences = await this.prisma.ocurrence.findMany({
        where: where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          students: true,
          user: true,
          responsible: true,
          tutors: true,
        },
        ...(isArchive === 'true' && {
          orderBy: {
            id: 'desc',
          },
        }),
      });

      return {
        data: occurrences,
        meta: { page: page, limit: limit, total: total },
      };
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async assumeOccurrence(
    occurrenceId: number,
    userId: number,
    userRole: string,
  ) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const occurrence = await this.prisma.ocurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          responsibleId: userId,
          status: 'ASSUMED',
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyEditOccurrence(occurrence);
      return occurrence;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async dispatchOccurrence(
    occurrenceId: number,
    userRole: string,
    dispatch: string,
    isEdit: boolean,
  ) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const occurrence = await this.prisma.ocurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          dispatch: dispatch,
          ...(!isEdit && { status: 'WAITING' }),
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyEditOccurrence(occurrence);
      return occurrence;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async conclueOccurrence(occurrenceId: number, userRole: string) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const occurrence = await this.prisma.ocurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          status: 'RESOLVED',
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyEditOccurrence(occurrence);
      return occurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async cancelOccurrence(
    occurrenceId: number,
    userId: number,
    userRole: string,
  ) {
    try {
      const verify = await this.prisma.ocurrence.findUnique({
        where: {
          id: occurrenceId,
        },
      });

      if (verify.userId != userId && !isAdmin(userRole))
        throw new UnauthorizedException('Você não pode execultar essa ação.');

      const occurrence = await this.prisma.ocurrence.update({
        where: {
          id: occurrenceId,
        },
        data: {
          status: 'CANCELED',
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.occurrenceGateway.notifyEditOccurrence(occurrence);
      return occurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }
}
