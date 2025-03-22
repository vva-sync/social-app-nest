import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from '../token/entity/token.entity';
import { TokenModule } from '../token/token.module';
import User from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token]), TokenModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {}
}
