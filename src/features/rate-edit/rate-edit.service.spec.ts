import { Test, TestingModule } from '@nestjs/testing';
import { RateEditService } from './rate-edit.service';

describe('RateEditService', () => {
  let service: RateEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateEditService],
    }).compile();

    service = module.get<RateEditService>(RateEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
