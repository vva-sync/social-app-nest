import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostsModule {}
