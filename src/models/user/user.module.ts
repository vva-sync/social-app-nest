import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from '../aws/aws.module';
import { TokenModule } from '../token/token.module';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserPasswordRepository } from './repositories/userPassword.repository';
import { UserConfirmationRepository } from './repositories/userConfirmation.repository';
import { UserPhotoRepository } from './repositories/userPhoto.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AwsModule,
    TokenModule,
    PrismaModule,
  ],
  providers: [
    UserService,
    UserRepository,
    UserPasswordRepository,
    UserConfirmationRepository,
    UserPhotoRepository,
  ],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
