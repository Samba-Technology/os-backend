import { Test, TestingModule } from '@nestjs/testing';
import { OccurrencesGateway } from './occurrences.gateway';

describe('OccurrencesGateway', () => {
  let gateway: OccurrencesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccurrencesGateway],
    }).compile();

    gateway = module.get<OccurrencesGateway>(OccurrencesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
