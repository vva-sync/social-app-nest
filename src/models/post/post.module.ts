import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TokenModule, UserModule, AwsModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostsModule {}
