import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { Restricted } from './middlewares/restricted';
import { AuthModule } from './models/auth/auth.module';
import Token from './models/token/entity/token.entity';
import { TokenModule } from './models/token/token.module';
import { TokenService } from './models/token/token.service';
import { UserModule } from './models/user/user.module';
import { TokenRepository } from './models/token/token.repository';

@Module({
  imports: [
    UserModule,
    MyConfigModule,
    DatabaseModule,
    AuthModule,
    TokenModule,
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [AppService, TokenService, TokenRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Restricted)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        {
          path: 'auth/signup',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/logout',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/token',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
