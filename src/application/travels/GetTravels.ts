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
      let travels = await this.travelService.getContent();
      if (!travels) {
        travels = await this.travelService.getContent(); // TODO
      }
      const [travel] = travels;

      const {
        minPriceFromDb,
        minPriceFromService,
      } = await this.getMinPrices(travel);

      if (!this.priceHasBeenChanged(minPriceFromDb, minPriceFromService)) {
        return null;
      }

      if (!this.priceHasBeenDecrease(minPriceFromDb, minPriceFromService)) {
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
    return true;
  }

  private async getMinPrices(travel: any): Promise<any> {
    const minPriceFromService = travel.departures[0].minPrice;

    const { departures = [] } = await this.travelsRepositoryReader.getById(travel.id) || {};
    const minPriceFromDb = departures[0]?.minPrice;

    return {
      minPriceFromService,
      minPriceFromDb,
    };
  }

  private priceHasBeenChanged(minPriceFromDb: number, minPriceFromService: number): boolean {
    return minPriceFromDb !== minPriceFromService;
  }

  private priceHasBeenDecrease(minPriceFromDb: number, minPriceFromService: number): boolean {
    return minPriceFromDb > minPriceFromService;
  }
}
