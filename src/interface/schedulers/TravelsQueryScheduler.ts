import { config } from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetTravels } from '@src/application';

config();

@Injectable()
export class TravelsQueryScheduler {
  constructor(
    @Inject('GetTravels')
    private readonly travelsHandler: GetTravels,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async schedule() {
    this.travelsHandler.invoke();
  }
}
