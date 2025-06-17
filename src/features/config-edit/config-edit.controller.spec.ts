import { Test, TestingModule } from '@nestjs/testing';
import { ConfigEditController } from './config-edit.controller';

describe('ConfigEditController', () => {
  let controller: ConfigEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigEditController],
    }).compile();

    controller = module.get<ConfigEditController>(ConfigEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
