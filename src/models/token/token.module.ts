import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TokenController } from './token.controller';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [PrismaModule],
  providers: [TokenService, TokenRepository],
  controllers: [TokenController],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {
  constructor() {}
}
