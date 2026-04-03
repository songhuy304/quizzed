import { Module } from '@nestjs/common';
import { HelperPaginationService } from './services/helper.pagination.service';
import { HelperQueryService } from '@/common/helper/services/helper.query.service';

@Module({
  controllers: [],
  providers: [HelperPaginationService, HelperQueryService],
  exports: [HelperPaginationService, HelperQueryService],
})
export class HelperModule {}
