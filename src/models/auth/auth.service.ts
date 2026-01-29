import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { TokenService } from '../token/token.service';
import { CreateUserDto, LoginUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(user: CreateUserDto) {
    const { password, ...userData } = user;

    const isUserExist = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });

    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = this.hashPassword(password);
    const activationLink = uuid();

    const newUser = await this.userService.createUser(userData);

    await this.userService.saveUserPassword(newUser.id, hashedPassword);

    await this.userService.saveUserActivationLink(newUser, activationLink);

    await this.sendConfirmationEmail(user.email, activationLink);

    return {
      message: 'User created successfully',
      username: user.username,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
      include: { tokens: true },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const userPassword = await this.userService.findUserPassword(user.id);

    if (!userPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = this.checkPassword(
      loginUserDto.password,
      userPassword,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isActivated = await this.userService.isActivatedUser(user.id);

    if (!isActivated) {
      throw new HttpException('User is not activated', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.tokenService.generateAccessToken({
      username: user.username,
      id: user.id,
    });

    const isRefreshTokenExist = await this.tokenService.findTokenByUser(
      user.id,
    );

    if (isRefreshTokenExist) {
      await this.tokenService.deleteRefreshToken(isRefreshTokenExist.token);
    }

    const refreshToken = this.tokenService.generateRefreshToken({
      username: user.username,
      id: user.id,
    });

    // @ts-expect-error: will refactor to prisma service later
    await this.tokenService.saveRefreshToken(refreshToken, user);

    return {
      message: 'Login successful',
      id: user.id,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string) {
    const result = await this.tokenService.deleteRefreshToken(refreshToken);

    if (result.affected === 0) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return {
      message: 'Logout successful',
    };
  }

  private hashPassword(password: string) {
    const saltRounds = Number(this.configService.get('PASSWORD_SALT_ROUNDS'));

    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  private checkPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  private async sendConfirmationEmail(email: string, activationLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      html: `
        <h1>Confirm your email</h1>
        <p>Click <a href="http://${this.configService.get('SERVER_HOST')}:${this.configService.get('SERVER_PORT')}/api/v1/social/auth/confirm/${activationLink}">here</a> to confirm your email.</p>
        `,
    });
  }
}
