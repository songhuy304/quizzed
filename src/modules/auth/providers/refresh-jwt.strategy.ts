import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {}
