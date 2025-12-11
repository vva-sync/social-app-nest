import { MailerModule } from '@nestjs-modules/mailer';
import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { getMailConfig } from './config/mail.config';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './models/auth/auth.module';
import { AwsModule } from './models/aws/aws.module';
import { Cache } from './models/cache/cache.module';
import { PostsModule } from './models/post/post.module';
import Token from './models/token/entity/token.entity';
import { TokenModule } from './models/token/token.module';
import { TokenRepository } from './models/token/token.repository';
import { TokenService } from './models/token/token.service';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    Cache,
    UserModule,
    TokenModule,
    MyConfigModule,
    AuthModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Token]),
    PostsModule,
    AwsModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
  providers: [
    AppService,
    TokenService,
    TokenRepository,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
      scope: Scope.REQUEST,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
