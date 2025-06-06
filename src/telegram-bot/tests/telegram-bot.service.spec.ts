import { Test, TestingModule } from '@nestjs/testing';
import { TelegramBotService } from '../telegram-bot.service';

describe('TelegramBotService', () => {
  let service: TelegramBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramBotService],
    }).compile();

    service = module.get<TelegramBotService>(TelegramBotService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
