import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  logout() {
    return this.authService.logout();
  }
}
