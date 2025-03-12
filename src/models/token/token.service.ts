import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import User from '../user/entities/user.entity';
import Token from './entity/token.entity';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokenRepository: TokenRepository,
  ) {}

  async saveRefreshToken(token: string, user: User) {
    await this.tokenRepository.saveRefreshToken(token, user);
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.tokenRepository.deleteRefreshToken(refreshToken);
  }

  async findRefreshToken(refreshToken: string) {
    return await this.tokenRepository.findRefreshToken(refreshToken);
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.configService.get('auth.accessTokenSecret'));
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(
      token,
      this.configService.get('auth.refreshTokenSecret'),
    ) as { username: string };
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

  async refreshAccessToken(refreshToken: string) {
    const isTokenExist = await this.findRefreshToken(refreshToken);

    if (!isTokenExist) {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }

    let decoded: { username: string };

    try {
      decoded = this.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }

    const accessToken = this.generateAccessToken({
      username: decoded.username,
    });

    return { accessToken };
  }
}
