import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { UserService } from '../user/user.service';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly awsService: AwsService,
  ) {}

  async getPosts(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.postRepository.getPosts(userId);
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

  async deletePost(id: number) {
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
