import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostRequestDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumberString()
  creator: string;

  @IsOptional()
  files: Express.Multer.File[];
}
