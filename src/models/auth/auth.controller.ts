import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  LogoutUserDto,
} from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')
  logout(@Body() body: LogoutUserDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
