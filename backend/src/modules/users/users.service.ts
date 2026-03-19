import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    create(dto: CreateUserDto) {
        return this.prisma.user.create({
            data: dto,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }
}