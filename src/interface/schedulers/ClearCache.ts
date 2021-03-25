import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomLogger } from '@src/infrastructure';
import { Cache } from '@src/infrastructure/cache/Cache';

@Injectable()
export class ClearCache {
  constructor(
    private readonly logger: CustomLogger,
    private readonly cache: Cache,
  ) { }

  @Cron(CronExpression.EVERY_HOUR)
  public async schedule() {
    this.logger.info(`clearing cache at ${new Date().toISOString()}`);
    return this.cache.clear();
  }
}
