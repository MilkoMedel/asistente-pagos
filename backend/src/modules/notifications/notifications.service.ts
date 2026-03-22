import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private prisma: PrismaService) { }

    async createOverdueNotification(userId: string, accountName: string) {
        return this.prisma.notification.create({
            data: {
                userId,
                type: 'PAYMENT_OVERDUE',
                message: `Tu pago de ${accountName} está vencido`,
            },
        });
    }
}