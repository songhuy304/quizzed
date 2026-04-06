import { ERROR_POST } from '@/common/constants';
import { NotFoundException } from '@/common/filters/exception';
import { HelperPaginationService } from '@/common/helper/services/helper.pagination.service';
import { HelperQueryService } from '@/common/helper/services/helper.query.service';
import {
  ApiGenericResponseDto,
  ApiResponseDto,
  PaginatedResponseDto,
} from '@/common/response';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostResponseDto } from '../dtos/reponse';
import { PostCreateDto, PostGetDto } from '../dtos/request';
import { Post } from '../entities/post.entity';
import { IPostService } from '../interfaces/post.service.interface';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly _helperPagi: HelperPaginationService,
    private readonly _helperQuery: HelperQueryService,
  ) {}

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.postRepo.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(ERROR_POST.NOTFOUND);
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
    await this.postRepo.delete(id);
    return ApiGenericResponseDto.success('post.success');
  }

  async getPost(id: number): Promise<ApiResponseDto<PostResponseDto>> {
    const post = await this.findOne(id);
    return ApiResponseDto.success('post.success', post);
  }

  // cách dùng builder query
  async getAll(
    params: PostGetDto,
  ): Promise<PaginatedResponseDto<PostResponseDto>> {
    const { page = 1, limit = 10, search } = params;
    const qb = this.postRepo.createQueryBuilder('post');

    if (search) {
      qb.andWhere('(post.title ILIKE :search OR post.content ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    const { data, meta } = await this._helperPagi.paginateQueryBuilder(qb, {
      page,
      limit,
    });

    return PaginatedResponseDto.success(data, meta);
  }

  // cách dùng reposity
  async getAllRepo(
    params: PostGetDto,
  ): Promise<PaginatedResponseDto<PostResponseDto>> {
    const { page = 1, limit = 10, search } = params;

    const { data, meta } = await this._helperQuery.findMany(this.postRepo, {
      filters: [
        { field: 'title', op: 'ilike', value: search },
        { field: 'content', op: 'ilike', value: search },
      ],
      pagination: { page, limit },
    });

    return PaginatedResponseDto.success(data, meta);
  }
}
