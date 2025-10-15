import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { getMailConfig } from './config/mail.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './models/auth/auth.module';
import { AwsModule } from './models/aws/aws.module';
import { PostsModule } from './models/post/post.module';
import { SearchModule } from './models/search/search.module';
import Token from './models/token/entity/token.entity';
import { TokenModule } from './models/token/token.module';
import { TokenRepository } from './models/token/token.repository';
import { TokenService } from './models/token/token.service';
import { UserModule } from './models/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MyConfigModule,
    // ConfigModule.register({ folderPath: './config' }),
    UserModule,
    AuthModule,
    DatabaseModule,
    TokenModule,
    TypeOrmModule.forFeature([Token]),
    PostsModule,
    AwsModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    SearchModule,
  ],
  providers: [AppService, TokenService, TokenRepository, Reflector],
  controllers: [AppController],
})
export class AppModule {}
