import { Test, TestingModule } from '@nestjs/testing';
import { OcurrencesController } from './ocurrences.controller';

describe('OcurrencesController', () => {
  let controller: OcurrencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcurrencesController],
    }).compile();

    controller = module.get<OcurrencesController>(OcurrencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
