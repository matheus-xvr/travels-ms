import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import {
  CustomLogger,
  TravelsRepositoryWriter,
  MongoDbProviderConnection,
  TravelsRepositoryReader,
  UsersRepositoryWriter,
} from '@src/infrastructure';
import { Cache } from '@infrastructure/cache/Cache';
import { UsersRepositoryReader } from '@infrastructure/database/repositories/users/UsersRepositoryReader';

const travelsRepositoryWriter = {
  provide: 'TravelsRepositoryWriter',
  useClass: TravelsRepositoryWriter,
};

const travelsRepositoryReader = {
  provide: 'TravelsRepositoryReader',
  useClass: TravelsRepositoryReader,
};

const usersRepositoryWriter = {
  provide: 'UsersRepositoryWriter',
  useClass: UsersRepositoryWriter,
};

const usersRepositoryReader = {
  provide: 'UsersRepositoryReader',
  useClass: UsersRepositoryReader,
};

const mongoProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (
    logger: CustomLogger,
    providerDbConnection: MongoDbProviderConnection,
  ): Promise<MongoClient> => {
    try {
      return await providerDbConnection.connect();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },
  inject: [CustomLogger, MongoDbProviderConnection],
  exports: ['DATABASE_CONNECTION'],
};

const providers = [
  mongoProvider,
  travelsRepositoryWriter,
  travelsRepositoryReader,
  usersRepositoryWriter,
  usersRepositoryReader,
  MongoDbProviderConnection,
  CustomLogger,
  Cache,
];

@Module({
  providers,
  exports: providers,
})
export class DatabaseModule { }
