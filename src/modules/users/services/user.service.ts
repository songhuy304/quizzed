import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserService } from '../interfaces/user.service.interface';
import { UserResponseDto } from '../dtos/reponse';
import { NotFoundException } from '@/common/filters/exception';
import { ERROR_USER } from '@/common/constants';
import { ApiResponseDto } from '@/common/response';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userReposity: Repository<UserEntity>) {}

  async findOne(userName: string): Promise<UserEntity> {
    const user = await this.userReposity.findOne({
      where: {
        userName,
      },
    });
    if (!user) {
      throw new NotFoundException(ERROR_USER.NOT_FOUND);
    }
    return user;
  }

  async getProfile(userName: string): Promise<ApiResponseDto<UserResponseDto>> {
    const user = await this.findOne(userName);
    const data = UserMapper.toResponse(user);
    return ApiResponseDto.success(data);
  }
}
