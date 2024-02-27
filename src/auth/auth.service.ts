import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({ where: { email: email } })

        if (!user) {
            throw new NotFoundException(`Nenhum usuário cadastrado nesse email.`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha inválida.')
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id })
        }
    }
}
