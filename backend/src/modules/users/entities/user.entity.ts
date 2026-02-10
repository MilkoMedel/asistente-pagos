export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export class User {
    id: string;
    email: string;
    status: UserStatus;
}
