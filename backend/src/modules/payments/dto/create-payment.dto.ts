import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
    @IsString()
    accountId: string;

    @IsEnum(PaymentType)
    type: PaymentType;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}
