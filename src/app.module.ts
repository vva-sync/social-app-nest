import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './models/auth/auth.module';
import { TokenModule } from './models/token/token.module';

@Module({
  imports: [
    UserModule,
    MyConfigModule,
    DatabaseModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
