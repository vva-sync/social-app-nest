import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { MyConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [UserModule, MyConfigModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
