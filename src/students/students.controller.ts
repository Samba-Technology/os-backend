import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StudentListEntity } from './entities/studentList.entity';
import { RequestWithUser } from 'src/types/request';

@Controller('students')
@ApiTags('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: StudentListEntity })
    async findStudents(@Request() req: RequestWithUser) {
        return this.studentsService.findStudents(req.user.role)
    }
}
