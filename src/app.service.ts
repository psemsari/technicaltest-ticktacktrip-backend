import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  justify(text: string): string {
    return text;
  }

  getToken(): string {
    return 'Hello World!';
  }
}
