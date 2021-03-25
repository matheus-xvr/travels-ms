import { Module } from '@nestjs/common';

import { CreateUser, GetTravels } from '@application/index';
import { InfrastructureModule } from '@src/InfrastructureModule';
import { InterfaceOutboundModule } from '@src/InterfaceOutboundModule';
import { EmailSender, EmailValidator } from '@domain/index';

const createUser = {
  provide: 'CreateUser',
  useClass: CreateUser,
};

const providers = [
  GetTravels,
  EmailSender,
  EmailValidator,
  createUser,
];

@Module({
  imports: [
    InfrastructureModule,
    InterfaceOutboundModule,
  ],
  providers,
  exports: providers,
})
export class ApplicationModule { }
