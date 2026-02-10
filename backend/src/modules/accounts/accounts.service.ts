import { Injectable } from '@nestjs/common';
import { Account, Currency } from './entities/account.entity';

@Injectable()
export class AccountsService {
    private accounts: Account[] = [];

    create(userId: string, currency: Currency): Account {
        const account: Account = {
        id: crypto.randomUUID(),
        userId,
        balance: 0,
        currency,
        };

        this.accounts.push(account);
        return account;
    }

    findByUser(userId: string): Account[] {
        return this.accounts.filter(a => a.userId === userId);
    }
}
