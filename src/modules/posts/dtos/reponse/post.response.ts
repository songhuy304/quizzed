import { IsString } from 'class-validator';
import { Post } from '../../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto implements Partial<Post> {
  @IsString()
  @ApiProperty({
    example: 'title',
    type: String,
  })
  title: string;

  @IsString()
  content?: string;
}

export class PostCreateResponseDto extends PostResponseDto {}
