import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
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
        return await this.ocurrencesService.findOcurrences(req.user.id, req.user.role, parseInt(query.page), parseInt(query.limit), query.isArchive, query.queryStudent, parseInt(query.queryUser))
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

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceEntity })
    async disptachOcurrence(
        @Param('id') id: string,
        @Request() req: RequestWithUser,
        @Body() { dispatch }: OcurrenceDto
    ) {
        return await this.ocurrencesService.dispatchOcurrence(parseInt(id), req.user.role, dispatch)
    }

    @Post('/edit/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceEntity })
    async editOcurrence(
        @Param('id') id: string,
        @Request() req: RequestWithUser,
        @Body() { description, level, students }: OcurrenceDto
    ) {
        return await this.ocurrencesService.editOcurrence(parseInt(id), req.user.id, description, level, students)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceEntity })
    async conclueOcurrence(
        @Param('id') id: string,
        @Request() req: RequestWithUser,
    ) {
        return await this.ocurrencesService.conclueOcurrence(parseInt(id), req.user.role)
    }

    @Delete('/cancel/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: OcurrenceEntity })
    async cancelOcurrence(
        @Param('id') id: string,
        @Request() req: RequestWithUser,
    ) {
        return await this.ocurrencesService.cancelOcurrence(parseInt(id), req.user.id)
    }
}
