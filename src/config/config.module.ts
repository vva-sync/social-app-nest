import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import s3Config from './s3.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, s3Config],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class MyConfigModule {}
