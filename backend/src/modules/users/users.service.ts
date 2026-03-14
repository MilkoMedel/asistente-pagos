import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    create(name: string, email: string) {
        return this.prisma.user.create({
        data: {
            name,
            email
        }
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }
}