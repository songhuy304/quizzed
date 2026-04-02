import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { PostCreateDto, PostGetDto } from '../dtos/request';
import { PostResponseDto } from '../dtos/reponse';
import { IPostService } from '../interfaces/post.service.interface';
import { ERROR_POST } from '@/common/constants';
import {
  ApiGenericResponseDto,
  ApiResponseDto,
  PaginationMetadataDto,
  PaginatedResponseDto,
} from '@/common/response';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.postRepo.findOneBy({ id });

    if (!post) {
      throw new HttpException(ERROR_POST.NOTFOUND, HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async create(postData: PostCreateDto): Promise<PostResponseDto> {
    const post = this.postRepo.create({
      title: postData.title,
      content: postData.content,
    });
    return await this.postRepo.save(post);
  }

  async delete(id: number): Promise<ApiGenericResponseDto> {
    await this.findOne(id);
    // Delete by primary key to avoid any type mismatch on criteria.
    await this.postRepo.delete(id);
    return ApiGenericResponseDto.success('post.success');
  }

  async getPost(id: number): Promise<ApiResponseDto<PostResponseDto>> {
    const post = await this.findOne(id);
    return ApiResponseDto.success('post.success', post);
  }

  async getAll(
    params: PostGetDto,
  ): Promise<PaginatedResponseDto<PostResponseDto>> {
    const { search, page = 1, limit = 10 } = params;

    const [data, total] = await this.postRepo.findAndCount({
      where: search ? [{ title: ILike(`%${search}%`) }] : undefined,
      skip: (page - 1) * limit,
      take: limit,
    });

    const meta = new PaginationMetadataDto();
    meta.currentPage = page;
    meta.itemsPerPage = limit;
    meta.totalItems = total;
    meta.totalPages = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<PostResponseDto>();
    response.success = true;
    response.message = 'post.success';
    response.data = data;
    response.meta = meta;
    return response;
  }
}
