import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth.config';
import clientConfig from './client.config';
import databaseConfig from './database.config';
import mailerConfig from './mail.config';
import s3Config from './s3.config';
import serverConfig from './server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        authConfig,
        s3Config,
        mailerConfig,
        serverConfig,
        clientConfig,
      ],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class MyConfigModule { }

