/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

import { IUsersRepositoryWriter, User } from '@domain/index';
import { entityToRawData } from '@src/utils';
import { mapperToEntity } from '@infrastructure/database/mongodb/MongoDbGenericMapper';
import { Cache } from '@infrastructure/cache/Cache';

@Injectable()
export class UsersRepositoryWriter implements IUsersRepositoryWriter {
  private readonly collection: Collection;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: MongoClient,
    private readonly cache: Cache,
  ) {
    this.collection = this.dbConnection.db().collection('users');
  }

  public async create(user: User): Promise<User> {
    const rawUser = entityToRawData(user);
    const creation_date = new Date().toISOString();

    const dbResult = await this.collection.insertOne({
      ...rawUser,
      creation_date,
      update_date: creation_date,
    });

    this.cache.set(rawUser?.email, rawUser);

    return mapperToEntity<User>(User, dbResult);
  }
}
