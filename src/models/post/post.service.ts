import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { CacheService } from '../cache/cache.service';
import User from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Post } from './entity/post.entity';
import { PostRepository } from './post.repository';
import { Cached } from '../cache/decorators/cached.decorator';

@Injectable()
export class PostService {
  constructor(
    @Inject(CacheService) private cacheManager: CacheService,
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly awsService: AwsService,
  ) {}

  @Cached(Array<Post>, (id: number) => `user:${id}`, 60)
  async getPosts(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const posts = await this.postRepository.getPosts(userId);

    return posts;
  }

  async createPost(dto: {
    title: string;
    content: string;
    owner: number;
    creator: number;
    files: Express.Multer.File[];
  }) {
    const owner = await this.userService.findUserById(dto.owner);
    const creator = await this.userService.findUserById(dto.creator);

    if (!owner || !creator) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const newPost = {
      title: dto.title,
      content: dto.content,
      owner,
      creator,
    };

    const post = await this.postRepository.createPost(newPost);

    if (dto.files) {
      const savedPhotos = await this.awsService.uploadFiles(dto.files);
      await this.postRepository.savePostPhotos(savedPhotos, post);
    }
  }

  checkIfPostCanBeDeleted(post: Post, user: User) {
    return post.owner.id === user.id || post.creator.id === user.id;
  }

  async deletePost(id: number, user: User) {
    const post = await this.postRepository.getPostById(id);

    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }

    const canBeDeleted = this.checkIfPostCanBeDeleted(post, user);

    if (!canBeDeleted) {
      throw new HttpException(
        'You are not allowed to delete this post',
        HttpStatus.FORBIDDEN,
      );
    }

    const postPhotos = await this.postRepository.getPostPhotos(id);

    if (!postPhotos.length) {
      return await this.postRepository.deletePost(id);
    }

    return Promise.all(
      postPhotos.map(async (photo) => {
        await this.awsService.tagDeletedImage(photo.aws_key);
      }),
    ).then(() => {
      return this.postRepository.deletePost(id);
    });
  }
}
