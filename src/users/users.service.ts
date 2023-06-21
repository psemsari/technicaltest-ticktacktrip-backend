import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          email: "foo@bar.com",
        }
      ];
    async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
    }
}
