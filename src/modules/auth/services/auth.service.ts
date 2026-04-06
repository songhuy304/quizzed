import { ERROR_USER } from '@/common/constants';
import {
  NotFoundException,
  UnauthorizedException,
} from '@/common/filters/exception';
import { HelperEncryptionService } from '@/common/helper/services/helper.encryption.service';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userReposity: Repository<UserEntity>,
    private readonly _helperEncryptionService: HelperEncryptionService,
  ) {}

  public async login(data) {
    const user = await this.userReposity.findOneBy({ userName: data.userName });
    if (!user) {
      throw new NotFoundException(ERROR_USER.NOT_FOUND);
    }

    const isMatch = await this._helperEncryptionService.match(
      user.password,
      data.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(ERROR_USER.INVALID_CREDENTIALS);
    }

    const tokens = await this._helperEncryptionService.createJwtTokens({
      role: user.role,
      userId: user.id,
    });

    return {
      ...tokens,
      user,
    };
  }
}
