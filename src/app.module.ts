import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { OcurrencesModule } from './ocurrences/ocurrences.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    StudentsModule,
    OcurrencesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
