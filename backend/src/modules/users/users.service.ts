import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];

    create(email: string): User {
        const user: User = {
        id: crypto.randomUUID(),
        email,
        status: UserStatus.ACTIVE,
        };

        this.users.push(user);
        return user;
    }

    findAll(): User[] {
        return this.users;
    }
}
