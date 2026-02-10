export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    }

export class Account {
    id: string;
    userId: string;
    balance: number;
    currency: Currency;
}
