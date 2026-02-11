import { Injectable } from '@nestjs/common';
import { Payment, PaymentStatus, PaymentType } from './entities/payment.entity';
import { BadRequestException,NotFoundException } from '@nestjs/common';

@Injectable()
export class PaymentsService {
    // Simulación de almacenamiento en memoria para los pagos
    private payments: Payment[] = [];

    // Método para crear un nuevo pago
    create(accountId: string, type: PaymentType, amount: number, description?: string) {
        const payment = new Payment(accountId, type, amount, description);
        this.payments.push(payment);
        return payment;
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

}
