import { DatabaseModule } from '@/common/database/database.module';
import { HelperModule } from '@/common/helper/helper.module';
import { JwtAccessStrategy } from '@/modules/auth/providers/access-jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [],
  imports: [HelperModule, PassportModule, DatabaseModule],
  providers: [JwtAccessStrategy],
  exports: [JwtAccessStrategy],
})
export class AuthModule {}
