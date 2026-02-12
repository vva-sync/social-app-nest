import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../user/repositories/user.repository.interface';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async saveRefreshToken(token: string, user: IUser) {
    await this.tokenRepository.create({ token, user });
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.tokenRepository.deleteByToken(refreshToken);
  }

  async findRefreshToken(refreshToken: string) {
    return await this.tokenRepository.findByToken(refreshToken);
  }

  async findTokenByUser(id: number) {
    return await this.tokenRepository.findByUserId(id);
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.configService.get('auth.accessTokenSecret'));
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(
      token,
      this.configService.get('auth.refreshTokenSecret'),
    ) as { username: string; id: number; role: string };
  }

  generateAccessToken(body: { username: string; id: number; role: string }) {
    return jwt.sign(body, this.configService.get('auth.accessTokenSecret'), {
      expiresIn: this.configService.get('auth.accessTokenExpiresIn'),
    });
  }

  generateRefreshToken(body: { username: string; id: number; role: string }) {
    return jwt.sign(body, this.configService.get('auth.refreshTokenSecret'), {
      expiresIn: this.configService.get('auth.refreshTokenExpiresIn'),
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const isTokenExist = await this.findRefreshToken(refreshToken);

    if (!isTokenExist) {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }

    let decoded: { username: string; id: number; role: string };

    try {
      decoded = this.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }

    const accessToken = this.generateAccessToken({
      username: decoded.username,
      id: decoded.id,
      role: decoded.role,
    });

    return { accessToken };
  }
}
