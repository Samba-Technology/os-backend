import { Module } from '@nestjs/common';
import { OccurrencesController } from './occurrences.controller';
import { OccurrencesService } from './occurrences.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OccurrencesGateway } from './occurrences.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [OccurrencesController],
  providers: [OccurrencesService, OccurrencesGateway],
})
export class OccurrencesModule {}
