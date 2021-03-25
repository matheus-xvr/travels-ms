import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

import { ITravelsRepositoryWriter } from '@domain/index';

@Injectable()
export class TravelsRepositoryWriter implements ITravelsRepositoryWriter {
  private readonly collection: Collection;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private dbConnection: MongoClient,
  ) {
    this.collection = this.dbConnection.db().collection('travels');
  }

  public async create(travel: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const creation_date = new Date().toISOString();
    await this.collection.insertOne({
      creation_date,
      update_date: creation_date,
      ...travel,
    });
  }
}
