import { Controller, Get, Post, Request, Response, Body, Req, Header, Headers, HttpCode, RawBodyRequest} from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("justify")
  @Header("Content-Type", 'text/plain')
  @HttpCode(200)
  justify(
    @Headers("Content-Type") type: string,
    @Req() req: RawBodyRequest<Request>)
  : string {
    if (type != "text/plain")
      return "error"    
    
    const text = req.rawBody.toString();
    const justify_text = this.appService.justify(text);
    return justify_text;
  }

  @Post("token")
  getToken(): string {
    return this.appService.getToken();
  }
}
