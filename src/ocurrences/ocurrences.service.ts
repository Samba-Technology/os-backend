import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Levels } from '@prisma/client';
import { isAdmin } from 'src/helpers/authorization';
import { PrismaService } from 'src/prisma/prisma.service';
import { OcurrencesGateway } from './ocurrences.gateway';

@Injectable()
export class OcurrencesService {
  constructor(
    private prisma: PrismaService,
    private ocurrenceGateway: OcurrencesGateway,
  ) {}

  async create(
    description: string,
    level: Levels,
    students: string[],
    userId,
    tutors: number[],
  ) {
    try {
      const ocurrence = await this.prisma.ocurrence.create({
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

      this.ocurrenceGateway.notifyNewOcurrence(ocurrence);
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async editOcurrence(
    ocurrenceId: number,
    userId: number,
    description: string,
    level: Levels,
    students: string[],
    tutors: number[],
  ) {
    try {
      const verify = await this.prisma.ocurrence.findUnique({
        where: {
          id: ocurrenceId,
        },
      });

      if (verify.userId != userId)
        throw new UnauthorizedException('Você não pode execultar essa ação.');

      const ocurrence = await this.prisma.ocurrence.update({
        where: {
          id: ocurrenceId,
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

      this.ocurrenceGateway.notifyEditOcurrence(ocurrence);
      return ocurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async findOcurrences(
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

      const ocurrences = await this.prisma.ocurrence.findMany({
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
        data: ocurrences,
        meta: { page: page, limit: limit, total: total },
      };
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async assumeOcurrence(ocurrenceId: number, userId: number, userRole: string) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const ocurrence = await this.prisma.ocurrence.update({
        where: {
          id: ocurrenceId,
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

      this.ocurrenceGateway.notifyEditOcurrence(ocurrence);
      return ocurrence;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async dispatchOcurrence(
    ocurrenceId: number,
    userRole: string,
    dispatch: string,
  ) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const ocurrence = await this.prisma.ocurrence.update({
        where: {
          id: ocurrenceId,
        },
        data: {
          dispatch: dispatch,
          status: 'WAITING',
        },
        include: {
          user: true,
          responsible: true,
          students: true,
          tutors: true,
        },
      });

      this.ocurrenceGateway.notifyEditOcurrence(ocurrence);
      return ocurrence;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async conclueOcurrence(ocurrenceId: number, userRole: string) {
    if (!isAdmin(userRole))
      throw new UnauthorizedException('Você não pode executar essa ação.');
    try {
      const ocurrence = await this.prisma.ocurrence.update({
        where: {
          id: ocurrenceId,
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

      this.ocurrenceGateway.notifyEditOcurrence(ocurrence);
      return ocurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async cancelOcurrence(ocurrenceId: number, userId: number, userRole: string) {
    try {
      const verify = await this.prisma.ocurrence.findUnique({
        where: {
          id: ocurrenceId,
        },
      });

      if (verify.userId != userId && !isAdmin(userRole))
        throw new UnauthorizedException('Você não pode execultar essa ação.');

      const ocurrence = await this.prisma.ocurrence.update({
        where: {
          id: ocurrenceId,
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

      this.ocurrenceGateway.notifyEditOcurrence(ocurrence);
      return ocurrence;
    } catch (e) {
      throw new BadRequestException('Algo deu errado.');
    }
  }
}
