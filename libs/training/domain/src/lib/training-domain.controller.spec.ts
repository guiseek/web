import { Test } from '@nestjs/testing';
import { TrainingDomainController } from './training-domain.controller';
import { TrainingDomainService } from './training-domain.service';

describe('TrainingDomainController', () => {
  let controller: TrainingDomainController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TrainingDomainService],
      controllers: [TrainingDomainController]
    }).compile();

    controller = module.get(TrainingDomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
