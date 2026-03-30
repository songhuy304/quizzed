import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { DatabaseService } from '@/common/database/services/database.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: '/health',
})
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  @HealthCheck()
  public async getHealth() {
    return this.healthCheckService.check([
      () => this.databaseService.isHealthy(),
    ]);
  }
}
