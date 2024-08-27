import { Module } from '@nestjs/common';
import { OcurrencesController } from './ocurrences.controller';
import { OcurrencesService } from './ocurrences.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OcurrencesGateway } from './ocurrences.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [OcurrencesController],
  providers: [OcurrencesService, OcurrencesGateway],
})
export class OcurrencesModule {}
