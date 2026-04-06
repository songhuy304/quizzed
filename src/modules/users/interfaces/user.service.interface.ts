import { ApiResponseDto } from '@/common/response';
import { UserResponseDto } from '../dtos/reponse';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findOne(userName: string): Promise<UserEntity>;
  getProfile(userName: string): Promise<ApiResponseDto<UserResponseDto>>;
}
