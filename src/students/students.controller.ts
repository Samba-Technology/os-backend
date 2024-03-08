import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/request';
import { StudentsEntity } from './entities/students.entity';
import { StudentDto } from './dto/student.dto';

@Controller('students')
@ApiTags('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: StudentsEntity })
    async findStudents() {
        return this.studentsService.findStudents()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: StudentsEntity})
    async create(
        @Body() {ra, name, series, sclass}: StudentDto
    ) {
        return this.studentsService.create(ra, name, series, sclass)
    }
}
