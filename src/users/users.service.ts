import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private users = [
        {
          email: "foo@bar.com",
          tokens: 0
        }
      ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    
}
