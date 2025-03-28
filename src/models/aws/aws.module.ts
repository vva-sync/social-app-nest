import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigService } from 'aws-sdk';

@Module({
  imports: [],
  providers: [AwsService, ConfigService],
  exports: [AwsService],
})
export class AwsModule {}
