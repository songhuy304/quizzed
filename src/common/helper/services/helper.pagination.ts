import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
@Injectable()
export class HelperPaginationService {
  private readonly DEFAULT_LIMIT = 10;
  private readonly MAX_LIMIT = 100;

  constructor(private readonly logger: PinoLogger) {}
}
