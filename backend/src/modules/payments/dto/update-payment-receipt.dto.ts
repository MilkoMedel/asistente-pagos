import { IsOptional, IsString, MaxLength } from 'class-validator';

// DTO para actualizar el respaldo del comprobante (receiptNote) de un pago
export class UpdatePaymentReceiptDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    receiptNote?: string;
}
