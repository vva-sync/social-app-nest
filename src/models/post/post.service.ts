import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreatePostRequestDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
  ) {}

  async getPosts(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.postRepository.getPosts(userId);
  }

  async createPost(dto: CreatePostRequestDto) {
    const owner = await this.userService.findUserById(dto.ownerId);
    const creator = await this.userService.findUserById(dto.creatorId);

    if (!owner || !creator) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const newPost = {
      title: dto.title,
      content: dto.content,
      owner,
      creator,
    };

    await this.postRepository.createPost(newPost);
  }
}
