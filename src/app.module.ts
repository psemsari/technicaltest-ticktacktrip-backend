import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, UsersModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../node_modules/swagger-ui-dist/'),
  }),],
  controllers: [AppController],
  providers: [AppService, UsersService],
})

export class AppModule {}
