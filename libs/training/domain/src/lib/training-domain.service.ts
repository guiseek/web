import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TrainingPost } from './entity/training-post.entity';

@Injectable()
export class TrainingDomainService {
  constructor(
    @InjectRepository(TrainingPost)
    private readonly repo: MongoRepository<TrainingPost>
  ) {}

  async findAll(take: number = 10, skip: number = 0) {
    const [data, total] = await this.repo.findAndCount({ take, skip });
    return { data, total };
  }
}
