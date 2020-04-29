import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingDomainModule, TrainingPost } from '@web/training/domain';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://dbmongo:O9M6jvx7H22cEnjy@mongodb-cluster-sp-cjtez.gcp.mongodb.net/sample_training?retryWrites=true&w=majority',
      entities: [TrainingPost],
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
      synchronize: true
    }),
    TrainingDomainModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
