import { IsEnum } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

// DTO para actualizar el estado de un pago
export class UpdatePaymentStatusDto {
    @IsEnum(PaymentStatus)
    status: PaymentStatus;
}
