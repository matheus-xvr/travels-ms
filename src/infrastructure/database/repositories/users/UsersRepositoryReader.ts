import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

import { IUsersRepositoryReader, User } from '@domain/index';
import { mapperToEntity } from '@infrastructure/database/mongodb/MongoDbGenericMapper';
import { Cache } from '@infrastructure/cache/Cache';
import * as MongoPaging from 'mongo-cursor-pagination';

@Injectable()
export class UsersRepositoryReader implements IUsersRepositoryReader {
  private readonly collection: Collection;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private dbConnection: MongoClient,
    private readonly cache: Cache,
  ) {
    this.collection = this.dbConnection.db().collection('users');
  }

  public async getBy({ key, value }) {
    if (!this.cache.has(value)) {
      const dbResult = await this.collection.findOne({
        [key]: value,
      });
      if (!dbResult) {
        return null;
      }
      this.cache.set(value, dbResult);
    }
    return mapperToEntity<User>(User, this.cache.get(value));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async list({ limit = 100, query = {}, next: nextPage = null } = {}) {
    const options = nextPage
      ? {
        limit,
        // query,
        next: nextPage,
      } : {
        limit,
        // query,
      };

    const {
      results,
      previous,
      hasPrevious,
      next,
      hasNext,
    } = await MongoPaging.find(this.collection, options);

    return {
      users: results.map((result) => new User(result)),
      previous,
      hasPrevious,
      next,
      hasNext,
    };
  }
}
