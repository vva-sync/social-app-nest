import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './entity/token.entity';
import { TokenRepository } from './token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService, TokenRepository],
  controllers: [TokenController],
})
export class TokenModule {}
