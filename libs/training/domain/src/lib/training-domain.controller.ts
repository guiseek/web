import { Controller, Get, Query } from '@nestjs/common';
import { TrainingDomainService } from './training-domain.service';

@Controller('training-domain')
export class TrainingDomainController {
  constructor(private trainingDomainService: TrainingDomainService) {}

  @Get()
  get(@Query() { take, skip }) {
    console.log({ take, skip });
    return this.trainingDomainService.findAll(take, skip);
  }
}
