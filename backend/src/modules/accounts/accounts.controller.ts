import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    create(
        @Body()
        body: {
        name: string;
        dueDay: number;
        amount: number;
        userId: string;
        }
    ) {
        return this.accountsService.create(
        body.name,
        body.dueDay,
        body.amount,
        body.userId
        );
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.accountsService.findByUser(userId);
    }

}