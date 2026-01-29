import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { TokenModule } from '../token/token.module';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AwsModule,
    TokenModule,
    PrismaModule,
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
