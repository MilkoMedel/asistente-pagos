import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    providers: [NotificationsService, PrismaService],
    exports: [NotificationsService],
})
export class NotificationsModule { }