import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@src/InfrastructureModule';
import { TravelService } from '@src/interface/http/outbound/TravelService';

const travelService = {
  provide: 'TravelService',
  useClass: TravelService,
};

const providers = [
  travelService,
];

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers,
  exports: providers,
})
export class InterfaceOutboundModule { }
