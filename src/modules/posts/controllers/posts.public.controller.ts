import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostCreateDto, PostGetDto } from '../dtos/request';
import { PostCreateResponseDto } from '../dtos/reponse';
import { IApiBaseResponse } from '@/common/response/response.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PublicRoute } from '@/common/guard/decorator/guard.public.decorator';

@ApiTags('POST')
@Controller('/posts')
export class PostPublicController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  public getPost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPost(postId);
  }

  @PublicRoute()
  @Get()
  public getPosts(@Query() params: PostGetDto) {
    return this.postService.getAllRepo(params);
  }

  @Post()
  public createPost(
    @Body() payload: PostCreateDto,
  ): Promise<PostCreateResponseDto> {
    return this.postService.create(payload);
  }
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiBearerAuth('accessToken')
  @Delete(':id')
  public deletePost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<IApiBaseResponse> {
    return this.postService.delete(postId);
  }
}
