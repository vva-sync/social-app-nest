import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import Token from './entity/token.entity';
import User from '../user/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async saveRefreshToken(token: string, user: User) {
    await this.tokenRepository.insert({ token, user });
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.tokenRepository.delete({ token: refreshToken });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.configService.get('auth.accessTokenSecret'));
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
