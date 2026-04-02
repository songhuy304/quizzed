import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostCreateDto } from '../dtos/request';
import { PostCreateResponseDto, PostResponseDto } from '../dtos/reponse';
import { IApiBaseResponse } from '@/common/response/response.interface';
import { ApiResponseDto } from '@/common/response';

@Controller('/posts')
export class PostPublicController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  public getPost() {
    return { message: 'hello' };
  }

  @Get(':id')
  public getPostById(
    @Param('id') postId: number,
  ): Promise<ApiResponseDto<PostResponseDto>> {
    return this.postService.getPost(postId);
  }

  @Post('/')
  public createPost(
    @Body() payload: PostCreateDto,
  ): Promise<PostCreateResponseDto> {
    return this.postService.create(payload);
  }

  @Delete(':id')
  public deletePost(@Param('id') postId: number): Promise<IApiBaseResponse> {
    return this.postService.delete(postId);
  }
}
