import { Inject, Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { User } from '@domain/entities/User';

@Injectable()
export class EmailSender {
  constructor(
    @Inject('SMTP_TRASPORTER')
    private readonly smtpTransporter: Mail,
  ) { }

  public async sendEmail(
    { name, port, departures }: any,
    adminUser: User,
    user: User,
  ): Promise<void> {
    await this.smtpTransporter.sendMail(
      this.makeMailOptions({ name, port, departures }, adminUser, user),
    );
  }

  private makeMailOptions(travel: any, adminUser: User, user: User): Mail.Options {
    return {
      from: `'${adminUser.getName()}' <${adminUser.getEmail()}>`,
      to: `'${user.getName()}' <${user.getEmail()}>`,
      subject: 'O preço da sua viagem baixou 🚢🚢🚢',
      html: this.buidMessage(travel),
    };
  }

  private buidMessage(travel: any): string {
    return `Lembra da viagem de cruzeiro que percorrerá ${travel.name} que você estava planejando fazer em 2022?<\\br>`
      + `Então, o preço baixou! <\\br>No momento, ela está custando ${this.buildPrice(travel?.departures[0].minPrice)}.<\\br>`
      + `A data da partida será em ${this.buildDate(travel?.departures[0].id)}.`;
  }

  private buildPrice(minPrice: number): string {
    return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(minPrice);
  }

  private buildDate(date: string): string {
    const [year, month, day] = date.split('-');
    return new Intl.DateTimeFormat('pt-br').format(new Date(Date.UTC(+year, +month, +day, 3, 0, 0)));
  }
}
