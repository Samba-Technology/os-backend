import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OccurrenceDto } from './dto/occurrences.dto';
import { RequestWithUser } from 'src/types/request';
import { OccurrenceEntity } from './entities/occurrence.entity';
import { OccurrenceListEntity } from './entities/occurrenceList.entity';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: OccurrenceEntity })
  async create(
    @Body() { description, level, students, tutors }: OccurrenceDto,
    @Request() req: RequestWithUser,
  ) {
    return this.occurrencesService.create(
      description,
      level,
      students,
      req.user.id,
      tutors,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceListEntity })
  async getOccurrences(@Request() req: RequestWithUser, @Query() query: any) {
    return await this.occurrencesService.findOccurrences(
      req.user.id,
      req.user.role,
      parseInt(query.page),
      parseInt(query.limit),
      query.isArchive,
      query.queryStudent,
      parseInt(query.queryUser),
      query.queryClass,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceEntity })
  async assumeOccurrence(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    return await this.occurrencesService.assumeOccurrence(
      parseInt(id),
      req.user.id,
      req.user.role,
    );
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceEntity })
  async disptachOccurrence(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() { dispatch }: OccurrenceDto,
  ) {
    return await this.occurrencesService.dispatchOccurrence(
      parseInt(id),
      req.user.role,
      dispatch,
    );
  }

  @Post('/edit/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceEntity })
  async editOccurrence(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() { description, level, students, tutors }: OccurrenceDto,
  ) {
    return await this.occurrencesService.editOccurrence(
      parseInt(id),
      req.user.id,
      description,
      level,
      students,
      tutors,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceEntity })
  async conclueOccurrence(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    return await this.occurrencesService.conclueOccurrence(
      parseInt(id),
      req.user.role,
    );
  }

  @Delete('/cancel/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OccurrenceEntity })
  async cancelOccurrence(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    return await this.occurrencesService.cancelOccurrence(
      parseInt(id),
      req.user.id,
      req.user.role,
    );
  }
}
