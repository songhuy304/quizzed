import { IAuthUser } from '@/common/request/interfaces';
import { LoginDto } from '../dtos/request';
import { AuthRefreshResponseDto, LoginResponseDto } from '../dtos/response';

export interface IAuthService {
  login(payload: LoginDto): Promise<LoginResponseDto>;
  refreshTokens(payload: IAuthUser): Promise<AuthRefreshResponseDto>;
}
