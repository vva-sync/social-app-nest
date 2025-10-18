import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../guards/auth.guard';
import { CreatePostRequestDto } from './dto/post.dto';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller('/:userId/posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  async getPosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postService.getPosts(userId);
  }

  @Post('/')
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
    @Body()
    body: CreatePostRequestDto,
  ) {
    return await this.postService.createPost({
      ...body,
      files,
      owner: userId,
      creator: Number(body.creator),
    });
  }

  @Delete('/:postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.deletePost(postId);
  }
}
