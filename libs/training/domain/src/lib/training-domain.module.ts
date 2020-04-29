import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingPost } from './entity/training-post.entity';
import { PagerMiddleware } from './middlewares/pager.middleware';
import { TrainingDomainController } from './training-domain.controller';
import { TrainingDomainService } from './training-domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingPost])],
  controllers: [TrainingDomainController],
  providers: [TrainingDomainService],
  exports: [TrainingDomainService]
})
export class TrainingDomainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware)
      .forRoutes({ path: 'training-domain', method: RequestMethod.GET });
  }
}
