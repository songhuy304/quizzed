import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import configs from '@/common/configs';

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
    DatabaseModule,
  ],
  exports: [DatabaseModule],
})
export class CommonModule {}
