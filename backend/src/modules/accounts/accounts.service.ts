import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AccountsService {

    constructor(private prisma: PrismaService) {}

    create(
        name: string,
        dueDay: number,
        amount: number,
        userId: string
    ) {
        return this.prisma.account.create({
        data: {
            name,
            dueDay,
            amount,
            userId
        }
        });
    }

    findByUser(userId: string) {
        return this.prisma.account.findMany({
        where: { userId }
        });
    }

}