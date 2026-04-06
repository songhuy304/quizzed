import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Exemple } from './example.guard';

@Module({
  providers: [
    Exemple,
    {
      provide: APP_GUARD,
      useClass: Exemple,
    },
  ],
})
export class GuardModule {}
