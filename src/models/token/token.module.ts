import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './entity/token.entity';
import { TokenController } from './token.controller';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService, TokenRepository],
  controllers: [TokenController],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {
  constructor() {}
}
