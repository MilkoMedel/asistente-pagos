import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
    @IsString()
    userId: string;

    @IsString()
    accountId: string;

    @IsEnum(PaymentType)
    paymentType: PaymentType;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}
