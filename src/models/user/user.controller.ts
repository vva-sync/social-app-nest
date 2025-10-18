import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/users')
  async getUsers(
    @Query('search') search: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.userService.getUsers(search, offset, limit);
  }

  @Post('/:userId/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    return await this.userService.uploadImage(userId, file);
  }
}
