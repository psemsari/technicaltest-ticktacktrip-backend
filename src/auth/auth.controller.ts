import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('token')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email);
  }
}
