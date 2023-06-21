import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { readFileSync } from 'fs';

describe('AppService', () => {
  let appservice: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appservice = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return the text', () => {
      const filein = readFileSync('../input.txt', 'utf-8')
      const fileout = readFileSync('../output.txt', 'utf-8')
      expect(appservice.justify(filein.toString()))
      .toBe(fileout.toString());
    });
  });
});
