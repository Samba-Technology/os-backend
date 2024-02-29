import { Test, TestingModule } from '@nestjs/testing';
import { OcurrencesService } from './ocurrences.service';

describe('OcurrencesService', () => {
  let service: OcurrencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcurrencesService],
    }).compile();

    service = module.get<OcurrencesService>(OcurrencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
