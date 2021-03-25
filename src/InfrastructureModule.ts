import { HttpModule, Module } from '@nestjs/common';
import {
  CustomLogger,
  HttpClient,
  TravelHttpRequest,
  Cache,
} from '@infrastructure/index';
import { HttpDispatcher } from '@interface/http/outbound/HttpDispatcher';
import { DatabaseModule } from '@src/DatabaseModule';
import { SmtpModule } from '@src/SmtpModule';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    SmtpModule,
  ],
  providers: [
    CustomLogger,
    HttpClient,
    HttpDispatcher,
    TravelHttpRequest,
    Cache,
    SmtpModule,
  ],
  exports: [
    DatabaseModule,
    HttpDispatcher,
    CustomLogger,
    TravelHttpRequest,
    Cache,
    SmtpModule,
  ],
})
export class InfrastructureModule { }
