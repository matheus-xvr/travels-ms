import { Module } from '@nestjs/common';
import { ApplicationModule } from '@src/ApplicationModule';
import { InfrastructureModule } from '@src/InfrastructureModule';

import {
  HealthController,
  UsersController,
} from '@interface/index';

@Module({
  imports: [
    InfrastructureModule,
    ApplicationModule,
  ],
  controllers: [
    HealthController,
    UsersController,
  ],
})
export class InterfaceInboundModule { }
