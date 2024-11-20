import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import Token from './entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async saveRefreshToken(token: string) {
    await this.tokenRepository.insert({ token });
  }

  generateAccessToken(body: { username: string }) {
    return jwt.sign(body, this.configService.get('auth.accessTokenSecret'), {
      expiresIn: this.configService.get('auth.accessTokenExpiresIn'),
    });
  }

  generateRefreshToken(body: { username: string }) {
    return jwt.sign(body, this.configService.get('auth.refreshTokenSecret'), {
      expiresIn: this.configService.get('auth.refreshTokenExpiresIn'),
    });
  }
}
