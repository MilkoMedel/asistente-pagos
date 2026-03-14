import { Injectable } from '@nestjs/common';
import { Payment,PaymentStatus ,PaymentType } from './entities/payment.entity';
import { BadRequestException,NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class PaymentsService {
    
    constructor(private prisma: PrismaService) {}

    // Simulación de almacenamiento en memoria para los pagos
    private payments: Payment[] = [];

    // Método para crear un nuevo pago
    async create(
        accountId: string,
        userId: string,
        paymentType: PaymentType,
        amount: number,
        description?: string
        ) {
        return this.prisma.payment.create({
            data: {
            accountId,
            userId,
            paymentType,
            amount,
            description,
            status: 'PENDING'
        }
    });
}

    // Método para listar todos los pagos de una cuenta
    findAllByAccount(accountId: string) {
        return this.payments.filter(p => p.accountId === accountId);
    }

    // Método para actualizar el estado de un pago
    updateStatus(id: string, status: PaymentStatus) {
        const payment = this.payments.find(p => p.id === id);

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        if (payment.status === status) {
            return payment; // no hacemos nada
        }

        if (!this.canChangeStatus(payment.status, status)) {
            throw new BadRequestException(
            `Cannot change status from ${payment.status} to ${status}`,
            );
        }

        // Registrar historial antes del cambio
        payment.statusHistory.push({
            from: payment.status,
            to: status,
            changedAt: new Date(),
        });

        // Cambiar el estado
        payment.status = status;

        return payment;
    }

    // Método para actualizar el respaldo del comprobante (receiptNote)
    updateReceipt(id: string, receiptNote?: string) {
        const payment = this.payments.find(p => p.id === id);

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        payment.receiptNote = receiptNote;
        return payment;
    }

    // Método para validar si se puede cambiar el estado de un pago
    private canChangeStatus(
        current: PaymentStatus,
        next: PaymentStatus,
    ): boolean {
        if (current === PaymentStatus.PENDING) {
            return (
                next === PaymentStatus.PAID ||
                next === PaymentStatus.REJECTED
            );
        }

        return false;
    }

    async testConnection() {
        const users = await this.prisma.user.findMany();
        return users;
    }
}
