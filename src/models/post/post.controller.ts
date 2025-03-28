import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from './post.service';
import { ParseToJsonPipe } from 'src/pipes/ParseToJsonPipe';
@UseGuards(AuthGuard)
@Controller('/:userId/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postService.getPosts(userId);
  }

  @Post('/create')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ParseToJsonPipe())
    body: {
      creatorId: number;
      title: string;
      content: string;
    },
  ) {
    return await this.postService.createPost({
      ownerId: userId,
      ...body,
      files,
    });
  }
}
