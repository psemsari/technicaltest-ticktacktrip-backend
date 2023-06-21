import
{ Controller,
  UseGuards,
  Post, 
  Req, 
  Header,
  Headers,
  HttpCode, 
  HttpException,
  HttpStatus} 
  from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from './auth/auth.guard';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
  points: 80000, // Nombre total de mots autorisés par jour
  duration: 86400, // Durée en secondes (1 jour = 24 * 60 * 60)
});

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UseGuards(AuthGuard)
  @Post("justify")
  @Header("Content-Type", 'text/plain')
  @HttpCode(200)
  async justify(
    @Headers("Content-Type") type: string,
    @Req() req)
    : Promise<string> {
      const text: string = req.rawBody.toString();
      const wordCount = text.split(' ').length

      const user = req.user.sub
      try {
        await limiter.consume(user, wordCount); // Vérifie et consomme les mots pour cet utilisateur
      } catch (err) {
        throw new HttpException('Payment required', HttpStatus.PAYMENT_REQUIRED);
      }

      const justify_text = this.appService.justify(text);

      return justify_text;
    }
}
