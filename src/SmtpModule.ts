import { Module } from '@nestjs/common';

import {
  CustomLogger,
  SmtpProvider,
} from '@src/infrastructure';

import Mail = require('nodemailer/lib/mailer');

const smtpTransporter = {
  provide: 'SMTP_TRASPORTER',
  useFactory: async (
    logger: CustomLogger,
    smtpProvider: SmtpProvider,
  ): Promise<Mail> => {
    try {
      return await smtpProvider.buildTransport();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },
  inject: [CustomLogger, SmtpProvider],
  exports: ['SMTP_TRASPORTER'],
};

const providers = [
  smtpTransporter,
  CustomLogger,
  SmtpProvider,
];

@Module({
  providers,
  exports: providers,
})
export class SmtpModule { }
