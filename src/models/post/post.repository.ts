import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../shared/base-repository';
import User from '../user/entities/user.entity';
import { PostPhoto } from './entity/post-photo.entity';
import { Post } from './entity/post.entity';

export class PostRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async getPosts(userId: number) {
    return await this.getRepository(Post)
      .createQueryBuilder()
      .select('posts')
      .from(Post, 'posts')
      .where('posts.ownerId = :userId', { userId })
      .leftJoin('posts.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.username',
        'creator.first_name',
        'creator.last_name',
      ])
      .leftJoin(
        'creator.photos',
        'creatorPhotos',
        'creatorPhotos.isMain = :isMain',
        { isMain: true },
      )
      .addSelect(['creatorPhotos.url'])
      .leftJoinAndSelect('posts.photos', 'photos')
      .orderBy('posts.created_at', 'ASC')
      .getMany();
  }

  async getPostById(id: number): Promise<Post> {
    return await this.getRepository(Post).query(`
      SELECT * FROM post WHERE id = ${id}
    `)
  }

  async createPost(dto: {
    title: string;
    content: string;
    owner: User;
    creator: User;
  }) {
    return await this.getRepository(Post).save(dto);
  }

  async savePostPhotos(files: ManagedUpload.SendData[], post: Post) {
    for (const file of files) {
      await this.getRepository(PostPhoto).save({
        caption: '',
        display_order: files.indexOf(file),
        url: file.Location,
        aws_key: file.Key,
        post,
      });
    }
  }

  async deletePost(id: number) {
    const postPhotosRepository = this.getRepository(PostPhoto);

    await postPhotosRepository
      .createQueryBuilder()
      .delete()
      .from(PostPhoto)
      .where('postId = :postId', { postId: id })
      .execute();

    return await this.getRepository(Post).delete(id);
  }

  async getPostPhotos(id: number) {
    return this.getRepository(PostPhoto).findBy({
      post: { id },
    });
  }
}
