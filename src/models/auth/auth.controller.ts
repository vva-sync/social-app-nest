import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../../decorators/public.decorator';
import { TransactionInterceptor } from '../../shared/transaction.interceptors';
import { TokenService } from '../token/token.service';
import {
  CreateUserDto,
  LoginUserDto,
  RefreshTokenDto,
} from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) { }

  @Get('confirm/:link')
  async confirmEmail(@Param('link') link: string, @Res() res: Response) {

    try {
      await this.userService.activate(link);

      return res.redirect('http://localhost:5175/auth');
    } catch { }
  }

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
