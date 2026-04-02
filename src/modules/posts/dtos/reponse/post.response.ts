import { IsString } from 'class-validator';
import { Post } from '../../entities/post.entity';

export class PostResponseDto implements Partial<Post> {
  @IsString()
  title: string;

  @IsString()
  content?: string;
}

export class PostCreateResponseDto extends PostResponseDto {}
