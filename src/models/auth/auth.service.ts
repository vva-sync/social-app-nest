import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async signup(user: CreateUserDto) {
    const { password } = user;

    const isUserExist = await this.userService.findUserByEmail(user.email);

    if (isUserExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = this.hashPassword(password);

    await this.userService.createUser({ ...user, password: hashedPassword });

    return {
      message: 'User created successfully',
    };
  }

  login() {
    return 'login';
  }

  logout() {
    return 'logout';
  }

  private hashPassword(password: string) {
    const saltRounds = Number(
      this.configService.get<string>('auth.saltRounds'),
    );

    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
