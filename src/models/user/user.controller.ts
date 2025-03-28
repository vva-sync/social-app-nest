import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('/:userId')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    return await this.userService.uploadImage(userId, file);
  }
}
