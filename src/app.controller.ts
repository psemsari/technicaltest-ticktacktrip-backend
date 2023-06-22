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
import {
  ApiTags,
  ApiSecurity,
  ApiBearerAuth,
  ApiOkResponse,
  ApiMethodNotAllowedResponse,
  ApiProduces,
  ApiResponse, ApiConsumes, ApiHeader, ApiUnauthorizedResponse, ApiBody
} from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

const limiter = new RateLimiterMemory({
  points: 80000, // Nombre total de mots autorisés par jour
  duration: 86400, // Durée en secondes (1 jour = 24 * 60 * 60)
});

@ApiTags('Justify')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @ApiProduces('text/plain')
  @ApiConsumes('text/plain')
  @ApiBody({type: String,
  examples: {"test text": {value: readFileSync(join(process.cwd(), './assets/input.txt'), 'utf-8')}}})
  @ApiOkResponse({description: "return justify the content", type: String})
  @ApiMethodNotAllowedResponse({description: "need content-type to text/plain"})
  @ApiUnauthorizedResponse({description: "need a bearer token from /api/token"})
  @ApiResponse({ status: 402, description: 'you have exceeded the 80,000-word limit'})

  @UseGuards(AuthGuard)
  @Post("justify")
  @Header("Content-Type", 'text/plain')
  @HttpCode(200)
  async justify(
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
