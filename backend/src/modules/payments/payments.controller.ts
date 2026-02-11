import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { UpdatePaymentReceiptDto } from './dto/update-payment-receipt.dto';


@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    // Endpoint para crear un pago
    @Post()
    create(@Body() dto: CreatePaymentDto) {
        return this.paymentsService.create(
        dto.accountId,
        dto.type,
        dto.amount,
        dto.description,
        );
    }

    // Endpoint para listar todos los pagos de una cuenta
    @Get(':accountId')
    findAll(@Param('accountId') accountId: string) {
        return this.paymentsService.findAllByAccount(accountId);
    }

    // Endpoint para actualizar el estado de un pago
    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdatePaymentStatusDto,
        ) {
        return this.paymentsService.updateStatus(id, dto.status);
    }

    // Endpoint para actualizar el respaldo del comprobante (receiptNote)
    @Patch(':id/receipt')
    updateReceipt(
        @Param('id') id: string,
        @Body() dto: UpdatePaymentReceiptDto,
    ) {
        return this.paymentsService.updateReceipt(id, dto.receiptNote);
    }
}
