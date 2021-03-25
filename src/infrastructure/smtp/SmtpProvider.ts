import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

@Injectable()
export class SmtpProvider {
  private readonly config: any;

  constructor(configService: ConfigService) {
    this.config = configService.get('smtpClient');
  }

  public async buildTransport(): Promise<Mail> {
    return createTransport({
      host: this.config.host,
      port: this.config.port,
      auth: {
        user: this.config.user,
        pass: this.config.password,
      },
      logger: Boolean(this.config.debug),
      debug: Boolean(this.config.debug),
    } as any);
  }
}
