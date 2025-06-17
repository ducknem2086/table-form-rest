import { Test, TestingModule } from '@nestjs/testing';
import { ConfigEditService } from './config-edit.service';

describe('ConfigEditService', () => {
  let service: ConfigEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigEditService],
    }).compile();

    service = module.get<ConfigEditService>(ConfigEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
