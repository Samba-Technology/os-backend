import { Test, TestingModule } from '@nestjs/testing';
import { OcurrencesGateway } from './ocurrences.gateway';

describe('OcurrencesGateway', () => {
  let gateway: OcurrencesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcurrencesGateway],
    }).compile();

    gateway = module.get<OcurrencesGateway>(OcurrencesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
