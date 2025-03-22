import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/shared/base-repository';
import { DataSource } from 'typeorm';
import { CreatePostDto } from './dto/post.dto';
import { Post } from './entity/post.entity';

export class PostRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async getPosts(userId: number) {
    return await this.getRepository(Post).find({
      where: { owner: { id: userId } },
    });
  }

  async createPost(dto: CreatePostDto) {
    return await this.getRepository(Post).save(dto);
  }
}
