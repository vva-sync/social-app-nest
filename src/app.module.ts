import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './models/auth/auth.module';
import Token from './models/token/entity/token.entity';
import { TokenModule } from './models/token/token.module';
import { TokenRepository } from './models/token/token.repository';
import { TokenService } from './models/token/token.service';
import { UserModule } from './models/user/user.module';
import { PostsModule } from './models/posts/posts.module';

@Module({
  imports: [
    UserModule,
    MyConfigModule,
    DatabaseModule,
    AuthModule,
    TokenModule,
    TypeOrmModule.forFeature([Token]),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService, TokenRepository],
})
export class AppModule {}
