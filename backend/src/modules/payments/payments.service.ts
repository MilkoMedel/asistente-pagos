import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, PaymentStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
@Injectable()
export class PaymentsService {

    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    // Crear pago
    async create(
        accountId: string,
        userId: string,
        paymentType: string,
        amount: number,
        description?: string
    ) {

        // 🔐 Validar que la cuenta pertenece al usuario
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
        });

        if (!account) {
            throw new NotFoundException('Account not found');
        }

        if (account.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        return this.prisma.payment.create({
            data: {
                accountId,
                userId,
                paymentType: paymentType as any,
                amount,
                description,
                status: PaymentStatus.PENDING
            }
        });
    }

    // Obtener pagos por cuenta (seguro)
    async findAllByAccount(accountId: string, userId: string) {

        return this.prisma.payment.findMany({
            where: {
                accountId,
                userId
            }
        });
    }

    // Marcar como pagado
    async markAsPaid(id: string, userId: string) {

        const payment = await this.prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        if (payment.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        if (payment.status !== PaymentStatus.PENDING) {
            throw new BadRequestException('Payment is not pending');
        }

        return this.prisma.payment.update({
            where: { id },
            data: {
                status: PaymentStatus.PAID,
                paidAt: new Date()
            }
        });
    }

    async checkOverduePayments(userId: string) {
        const today = new Date();
        const currentDay = today.getDate();
        const payments = await this.prisma.payment.findMany({
            where: {
                userId,
                status: 'PENDING',
            },
            include: {
                account: true,
            },
        });

        for (const payment of payments) {
            const dueDay = payment.account.dueDay;

            if (currentDay > dueDay && payment.status !== 'OVERDUE') {
                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'OVERDUE',
                    },
                });

                await this.notificationsService.createOverdueNotification(
                    payment.userId,
                    payment.account.name,
                );
            }
        }

        return {
            message: 'Checked overdue payments',
            checked: payments.length,
        };
    }
}