import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import configs from '@/common/configs';
import { RequestModule } from '@/common/request/request.module';
import { LoggerModule } from '@/common/logger/logger.module';
import { HelperModule } from './helper/helper.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    // Configuration - Global
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),

    // Core Infrastructure
    GuardModule,
    DatabaseModule,
    RequestModule,
    LoggerModule,
    HelperModule,
  ],
  exports: [DatabaseModule],
})
export class CommonModule {}
