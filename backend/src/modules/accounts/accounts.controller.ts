import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'generated/prisma';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {

    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    create(
        @GetUser() user: any,
        @Body() body: {
        name: string;
        dueDay: number;
        amount: number;
        }
    ) {
        return this.accountsService.create(
        body.name,
        body.dueDay,
        body.amount,
        user.id // 🔐 AQUÍ está la clave
        );
    }

    @Get()
    findMyAccounts(@GetUser() user: any) {
        return this.accountsService.findByUser(user.id);
    }
}