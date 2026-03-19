import { Injectable, BadRequestException } from '@nestjs/common';
// Register
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './interfaces/auth-response.interface';
// Login
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        const { email, password, name } = registerDto;

        // 1. Verificar si usuario ya existe (mejor UX que esperar error Prisma)
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        // 2. Hash del password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Crear usuario
        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
            });

        // 4. Retornar respuesta segura
        return {
            user,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // 1. Buscar usuario
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Comparar password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Generar payload
        const payload = {
            sub: user.id,
            email: user.email,
        };

        // 4. Generar token
        const token = this.jwtService.sign(payload);

        // 5. Respuesta segura
        return {
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            },
            token,
        };
    }
}