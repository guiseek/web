import { Test } from '@nestjs/testing';
import { TrainingDomainService } from './training-domain.service';

describe('TrainingDomainService', () => {
  let service: TrainingDomainService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TrainingDomainService]
    }).compile();

    service = module.get(TrainingDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
