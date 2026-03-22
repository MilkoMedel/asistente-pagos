import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PaymentsService } from '../payments/payments.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SchedulerService {

    constructor(
        private paymentsService: PaymentsService,
        private prisma: PrismaService,
    ) {}

    @Cron('0 0 * * *') 
    async handleOverdueCheck() {
        console.log('Running overdue check...');

        const users = await this.prisma.user.findMany();

        for (const user of users) {
        await this.paymentsService.checkOverduePayments(user.id);
        }
    }
}