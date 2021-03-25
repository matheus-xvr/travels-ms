/* eslint-disable consistent-return */
import { Injectable, Inject } from '@nestjs/common';

import { CustomLogger } from '@src/infrastructure';
import { ITravelService } from '@interface/index';
import {
  EmailSender,
  ITravelsRepositoryReader,
  ITravelsRepositoryWriter,
  IUsersRepositoryReader,
  User,
} from '@src/domain';

@Injectable()
export class GetTravels {
  private sentEmail = false;

  constructor(
    @Inject('TravelService')
    private readonly travelService: ITravelService,
    @Inject('TravelsRepositoryWriter')
    private readonly travelsRepositoryWriter: ITravelsRepositoryWriter,
    @Inject('TravelsRepositoryReader')
    private readonly travelsRepositoryReader: ITravelsRepositoryReader,
    private readonly emailSender: EmailSender,
    private readonly logger: CustomLogger,
    @Inject('UsersRepositoryReader')
    private readonly usersRepositoryReader: IUsersRepositoryReader,
  ) { }

  public async invoke(): Promise<void> {
    try {
      if (this.sentEmail) {
        return null;
      }
      let travels = await this.travelService.getContent();
      if (!travels) {
        travels = await this.travelService.getContent(); // TODO
      }
      const [travel] = travels;

      if (!await this.priceHasBeenChanged(travel)) {
        return null;
      }

      await this.travelsRepositoryWriter.create(travel);
      const adminUser = await this.usersRepositoryReader.getBy({
        key: 'admin',
        value: true,
      });

      await this.emailDispatcher(travel, adminUser);
    } catch (error) {
      this.logger.error(`ERROR => HTTP STATUS ${error.status}, DATA ${JSON.stringify(error.data || error.message)}, HEADERS => ${JSON.stringify(error.headers)}`);
    }
  }

  private async emailDispatcher(
    travel: any,
    adminUser: User,
    { nextValue = null } = {},
  ): Promise<boolean> {
    const {
      users,
      next,
      hasNext,
    } = await this.usersRepositoryReader.list(
      nextValue
        ? { limit: 2, query: { admin: false }, next: nextValue }
        : { limit: 2, query: { admin: false } },
    );

    Promise.all(
      users.map((user: User) => this.emailSender.sendEmail(travel, adminUser, user)),
    );

    if (hasNext) {
      return this.emailDispatcher(travel, adminUser, { nextValue: next });
    }
    this.sentEmail = true;
    return true;
  }

  private async priceHasBeenChanged(travel: any): Promise<boolean> {
    const minPriceFromService = travel.departures[0].minPrice;

    const { departures = [] } = await this.travelsRepositoryReader.getById(travel.id) || {};
    const minPriceFromDb = departures[0]?.minPrice;

    return minPriceFromService !== minPriceFromDb;
  }
}
