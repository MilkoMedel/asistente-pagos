import { v4 as uuid } from 'uuid';

// Definición de tipos de pago y estados
export enum PaymentType {
    LIGHT = 'light',
    GAS = 'gas',
    INTERNET = 'internet',
    BANK = 'bank',
    SUBSCRIPTION = 'subscription',
}

// Estados posibles para un pago
export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    REJECTED = 'REJECTED',

}

// para llevar un historial de cambios de estado
export interface PaymentStatusHistory { 
    from: PaymentStatus;
    to: PaymentStatus;
    changedAt: Date;
}

// Entidad principal del módulo de pagos
export class Payment {
    id: string;
    accountId: string;
    type: PaymentType;
    amount: number;
    date: Date;
    description?: string;
    status: PaymentStatus;
    receiptNote?: string; // respaldo del comprobante, opcional
    statusHistory: PaymentStatusHistory[];

    constructor(
        accountId: string,
        type: PaymentType,
        amount: number,
        description?: string,
    ) {
        this.id = uuid();
        this.accountId = accountId;
        this.type = type;
        this.amount = amount;
        this.date = new Date();
        this.description = description;
        this.status = PaymentStatus.PENDING;
        this.receiptNote = undefined; // opcional
        this.statusHistory = []; // inicializamos el historial de cambios de estado

    }

}
