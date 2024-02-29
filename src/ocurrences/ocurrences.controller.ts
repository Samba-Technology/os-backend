import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { OcurrencesService } from './ocurrences.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { OcurrenceDto } from './dto/ocurrences.dto';
import { RequestWithUser } from 'src/types/request';
import { OcurrenceEntity } from './entities/ocurrences.entity';

@Controller('ocurrences')
export class OcurrencesController {
    constructor(private readonly ocurrencesService: OcurrencesService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: OcurrenceEntity })
    async create(
        @Body() {description, level, students}: OcurrenceDto,
        @Request() req: RequestWithUser
    ) {
        return this.ocurrencesService.create(description, level, students, req.user.role, req.user.id)
    }
}
