import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PaymentTypeDto {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    TRANSFER = 'TRANSFER',
}

export class CreatePaymentDto {

    @IsString()
    accountId: string;

    @IsEnum(PaymentTypeDto)
    paymentType: PaymentTypeDto;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}