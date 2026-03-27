import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PaymentsService } from '../payments/payments.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly prisma: PrismaService,
    ) { }

    @Cron('0 0 * * *') // todos los días a medianoche
    //@Cron('* * * * *') // cada minuto
    async handleOverduePayments() {
        this.logger.log('Starting overdue payments job...');

        const OVERDUE_PAYMENTS_LOCK_ID = 1001;

        // intentar adquirir lock (evita múltiples instancias)
        const acquired = await this.prisma.$queryRawUnsafe<boolean>(
            `SELECT pg_try_advisory_lock(${OVERDUE_PAYMENTS_LOCK_ID});`
        );

        if (!acquired) {
            this.logger.warn('Another instance is running this job');
            return;
        }

        try {
            const count = await this.paymentsService.processOverduePaymentsBatch();

            this.logger.log(`Job completed. Updated ${count} payments`);
        } catch (error) {
            this.logger.error('Job failed...', error.stack);
        } finally {
            // liberar lock
            await this.prisma.$queryRawUnsafe(
                `SELECT pg_advisory_unlock(${OVERDUE_PAYMENTS_LOCK_ID});`
            );
        }
    }
}