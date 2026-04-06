import { Module } from '@nestjs/common';
import { HelperPaginationService } from './services/helper.pagination.service';
import { HelperQueryService } from '@/common/helper/services/helper.query.service';
import { HelperEncryptionService } from './services/helper.encryption.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [
    HelperPaginationService,
    HelperQueryService,
    HelperEncryptionService,
    JwtService,
  ],
  exports: [
    HelperPaginationService,
    HelperQueryService,
    HelperEncryptionService,
    JwtService,
  ],
})
export class HelperModule {}
