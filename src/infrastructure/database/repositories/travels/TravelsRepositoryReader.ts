import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

import { ITravelsRepositoryReader } from '@domain/index';

@Injectable()
export class TravelsRepositoryReader implements ITravelsRepositoryReader {
  private readonly collection: Collection;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private dbConnection: MongoClient,
  ) {
    this.collection = this.dbConnection.db().collection('travels');
  }

  public async getById(id: string) {
    return this.collection.findOne({ id });
  }
}
