import { Test, TestingModule } from '@nestjs/testing';
import { RateEditController } from './rate-edit.controller';

describe('RateEditController', () => {
  let controller: RateEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateEditController],
    }).compile();

    controller = module.get<RateEditController>(RateEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
