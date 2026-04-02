import { ApiResponseDto } from '@/common/response';
import { IApiBaseResponse } from '@/common/response/response.interface';
import { PostCreateResponseDto, PostResponseDto } from '../dtos/reponse';
import { PostCreateDto } from '../dtos/request';

export interface IPostService {
  findOne(id: number): Promise<PostResponseDto>;
  create(data: PostCreateDto): Promise<PostCreateResponseDto>;
  delete(id: number): Promise<IApiBaseResponse>;
  getPost(id: number): Promise<ApiResponseDto<PostResponseDto>>;
}
