import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PaymentStatus } from '@prisma/client';
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

        if (!account) throw new NotFoundException('Account not found');

        if (account.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        // 👇 construir dueDate desde dueDay
        const now = new Date();

        // último día del mes actual
        const lastDayOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
        ).getDate();

        // Validar que dueDay es entre 1 y 31
        if (account.dueDay < 1 || account.dueDay > 31) {
            throw new BadRequestException('Invalid dueDay');
        }

        // asegurar día válido
        const safeDay = Math.min(account.dueDay, lastDayOfMonth);

        const dueDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            safeDay,
        );

        // si ya pasó → siguiente mes
        if (dueDate <= now) {
            dueDate.setMonth(dueDate.getMonth() + 1);
        }

        return this.prisma.payment.create({
            data: {
                accountId,
                userId,
                paymentType: paymentType as any,
                amount,
                description,
                status: PaymentStatus.PENDING,
                dueDate,
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

    async processOverduePaymentsBatch(): Promise<number> {
        const now = new Date();

        const result = await this.prisma.payment.updateMany({
            where: {
                status: PaymentStatus.PENDING,
                dueDate: {
                    lt: now,
                    not: null,
                },
            },
            data: {
                status: PaymentStatus.OVERDUE,
            },
        });

        return result.count;
    }

    // Método legacy - usar solo para testing o endpoint manual
    async checkOverduePayments(userId: string) {
        const today = new Date();
        const currentDay = today.getDate();
        const payments = await this.prisma.payment.findMany({
            where: {
                userId,
                status: PaymentStatus.PENDING,
            },
            include: {
                account: true,
            },
        });

        for (const payment of payments) {
            const dueDay = payment.account.dueDay;

            if (currentDay > dueDay && payment.status !== PaymentStatus.OVERDUE) {
                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: PaymentStatus.OVERDUE,
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

    async findOverduePaymentsDetailed() {
        const now = new Date();

        return this.prisma.payment.findMany({
            where: {
                status: PaymentStatus.PENDING,
                dueDate: {
                    lt: now,
                    not: null,
                },
            },
            include: {
                account: true,
            },
        });
    }
}