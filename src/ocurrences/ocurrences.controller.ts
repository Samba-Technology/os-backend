import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { OcurrencesService } from './ocurrences.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OcurrenceDto } from './dto/ocurrences.dto';
import { RequestWithUser } from 'src/types/request';
import { OcurrenceEntity } from './entities/ocurrence.entity';
import { OcurrenceListEntity } from './entities/ocurrenceList.entity';

@Controller('ocurrences')
export class OcurrencesController {
    constructor(private readonly ocurrencesService: OcurrencesService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: OcurrenceEntity })
    async create(
        @Body() { description, level, students }: OcurrenceDto,
        @Request() req: RequestWithUser
    ) {
        return this.ocurrencesService.create(description, level, students, req.user.id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceListEntity })
    async getOcurrences(
        @Request() req: RequestWithUser,
        @Query() query: any
    ) {
        return await this.ocurrencesService.findOcurrences(req.user.id, req.user.role, parseInt(query.page), parseInt(query.limit))
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceEntity })
    async assumeOcurrence(
        @Param('id') id: string,
        @Request() req: RequestWithUser
    ) {
        return await this.ocurrencesService.assumeOcurrence(parseInt(id), req.user.id, req.user.role)
    }
}
