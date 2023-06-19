import { Controller, Get, Post, Request, Response, Body, Req, Header, Headers, HttpCode, RawBodyRequest} from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("justify")
  justify(@Headers("Content-Type") type: string, @Req() req: RawBodyRequest<Request>): string {

    if (type != "text/plain")
      return "error"    
    const raw = req.rawBody.toString();
    return raw;
  }

  @Post("token")
  getToken(): string {
    return this.appService.getToken();
  }
}
