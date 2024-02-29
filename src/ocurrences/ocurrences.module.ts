import { Module } from '@nestjs/common';
import { OcurrencesController } from './ocurrences.controller';
import { OcurrencesService } from './ocurrences.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OcurrencesController],
  providers: [OcurrencesService]
})
export class OcurrencesModule {}
