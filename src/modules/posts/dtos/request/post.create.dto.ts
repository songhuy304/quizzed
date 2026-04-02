import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}
