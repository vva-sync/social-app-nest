import { IsNotEmpty, IsNumber } from 'class-validator';
import User from 'src/models/user/entities/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
  owner: User;
  creator: User;
}

export class CreatePostRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber()
  creatorId: number;
}
