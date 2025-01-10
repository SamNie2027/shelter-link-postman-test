import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { DynamoDbService } from '../dynamodb';

@Module({
  imports: [],
  providers: [ShelterService, DynamoDbService],
  controllers: [ShelterController],
  exports: [ShelterService],
})
export class ShelterModule {}
