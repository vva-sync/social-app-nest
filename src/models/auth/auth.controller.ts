import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  RefreshTokenDto,
} from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';
import { TransactionInterceptor } from 'src/shared/transaction.interceptors';
import { Public } from '../../../src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @UseInterceptors(TransactionInterceptor)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @UseInterceptors(TransactionInterceptor)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')
  logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('token')
  refreshAccessToken(@Body() body: RefreshTokenDto) {
    return this.tokenService.refreshAccessToken(body.refreshToken);
  }
}
