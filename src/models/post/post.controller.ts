import { Controller, Get, Post } from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor() {}

  @Get()
  getPosts() {
    return 'posts';
  }

  @Get(':id')
  getPostById() {
    return 'post';
  }

  @Post()
  createPost() {
    return 'post';
  }
}
