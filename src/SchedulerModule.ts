import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GetTravels } from '@src/application';
import { ApplicationModule } from '@src/ApplicationModule';
import { InfrastructureModule } from '@src/InfrastructureModule';
import { TravelsQueryScheduler } from '@src/interface';
import { InterfaceOutboundModule } from '@src/InterfaceOutboundModule';
import { ClearCache } from './interface/schedulers/ClearCache';

const getTravels = {
  provide: 'GetTravels',
  useClass: GetTravels,
};

const providers = [
  TravelsQueryScheduler,
  ClearCache,
  getTravels,
];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ApplicationModule,
    InterfaceOutboundModule,
    InfrastructureModule,
  ],
  providers,
  exports: providers,
})
export class SchedulerModule { }
