import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {

    constructor(private readonly paymentsService: PaymentsService) {}

    // Crear pago
    @Post()
    create(
        @GetUser() user: any,
        @Body() dto: CreatePaymentDto
    ) {
        return this.paymentsService.create(
        dto.accountId,
        user.id, 
        dto.paymentType,
        dto.amount,
        dto.description
        );
    }

    // Listar pagos por cuenta (seguro)
    @Get(':accountId')
    findAll(
        @Param('accountId') accountId: string,
        @GetUser() user: any
    ) {
        return this.paymentsService.findAllByAccount(accountId, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('check-overdue')
    checkOverdue(@GetUser() user: any) {
    return this.paymentsService.checkOverduePayments(user.id);
    }
}