import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { Restricted } from './middlewares/restricted';
import { AuthModule } from './models/auth/auth.module';
import { TokenModule } from './models/token/token.module';
import { UserModule } from './models/user/user.module';
import { TokenService } from './models/token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './models/token/entity/token.entity';

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
  providers: [AppService, TokenService],
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
