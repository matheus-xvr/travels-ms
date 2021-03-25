import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '@config/database';
import httpClient from '@config/httpClient';
import smtpClient from '@config/smtpClient';

import { InterfaceInboundModule } from '@src/InterfaceInboundModule';
import { InfrastructureModule } from '@src/InfrastructureModule';
import { ApplicationModule } from '@src/ApplicationModule';
import { SchedulerModule } from '@src/SchedulerModule';
import { InterfaceOutboundModule } from '@src/InterfaceOutboundModule';

const CONFIG_MODULE_OPTIONS = {
  isGlobal: true,
  load: [
    databaseConfig,
    httpClient,
    smtpClient,
  ],
};

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
    InfrastructureModule,
    InterfaceOutboundModule,
    InterfaceInboundModule,
    ApplicationModule,
    SchedulerModule,
  ],
})
export class MainModule { }
