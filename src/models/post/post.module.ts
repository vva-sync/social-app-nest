import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { Cache } from '../cache/cache.module';

@Module({
  imports: [TokenModule, UserModule, AwsModule, Cache],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostsModule { }
