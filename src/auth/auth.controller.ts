import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiProduces, ApiProperty, ApiTags } from '@nestjs/swagger';

class bearer {
  @ApiProperty()
  bearer: string
}

class mail {
  @ApiProperty()
  email: string
}

@ApiTags('Security')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({description: "need an email for authentification", type: mail, examples: {"To Use": {value: '{"email":"foo@bar.com"}'}}})
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiOkResponse({description: "return bearer token", type: bearer})
  @ApiBadRequestResponse({description: "user unknown"})

  @HttpCode(HttpStatus.OK)
  @Post('token')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email);
  }
}
