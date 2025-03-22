import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from './post.service';
@UseGuards(AuthGuard)
@Controller('/:userId/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postService.getPosts(userId);
  }

  @Post('/create')
  async createPost(
    @Body()
    dto: {
      ownerId: number;
      creatorId: number;
      title: string;
      content: string;
    },
    @Param('userId') userId: number,
  ) {
    return await this.postService.createPost({ ownerId: userId, ...dto });
  }
}
