import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StudentsEntity } from './entities/students.entity';
import { StudentDto } from './dto/student.dto';
import { RequestWithUser } from 'src/types/request';

@Controller('students')
@ApiTags('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: StudentsEntity })
  async findStudents(@Query() query: any) {
    return this.studentsService.findStudents(
      parseInt(query.page),
      parseInt(query.limit),
      query.queryStudent,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: StudentsEntity })
  async create(@Body() { ra, name, series, sclass }: StudentDto) {
    return this.studentsService.create(ra, name, series, sclass);
  }

  @Post(':ra')
  @UseGuards(JwtAuthGuard)
  @ApiAcceptedResponse({ type: StudentsEntity })
  async edit(
    @Body() { name, series, sclass }: StudentDto,
    @Request() req: RequestWithUser,
    @Param('ra') ra: string,
  ) {
    return this.studentsService.edit(ra, name, series, sclass, req.user.role);
  }
}
