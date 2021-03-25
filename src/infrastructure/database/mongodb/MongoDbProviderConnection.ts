/* eslint-disable prefer-template */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, MongoClientOptions } from 'mongodb';

@Injectable()
export class MongoDbProviderConnection {
  private readonly config: any;

  private connection: MongoClient;

  constructor(configService: ConfigService) {
    this.connection = null;
    this.config = configService.get('mongoDb');
  }

  public async connect(): Promise<MongoClient> {
    if (this.connection) {
      return this.connection;
    }

    try {
      this.connection = await MongoClient.connect(
        this.buildMongoUrl(),
        this.buildMongoOptions(),
      );
      this.connection.readPreference.mode = 'nearest';
      this.setEventListeners();

      return this.connection;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private setEventListeners(): void {
    this.connection.on('connected', () => console.info('Mongodb connection stablished'));
    this.connection.on('disconnected', () => console.info('Mongodb connection lost'));
  }

  private buildMongoOptions(): MongoClientOptions {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  private buildMongoUrl(): string {
    const {
      userName,
      password,
      port,
      hosts,
      database,
      dialect,
      replicaSet,
      authSource,
      retryWrites,
      dbW,
    } = this.config;
    const userPass = userName && password ? `${encodeURIComponent(userName)}:${encodeURIComponent(password)}@` : null;
    const parsedHosts = JSON.parse(hosts);
    const url = parsedHosts.reduce((prev, cur, i) => prev + cur + `${port ? `:${port}` : ''}${i === parsedHosts.length - 1 ? '' : ','}`, `${dialect}://${userPass}`);
    return `${url}/${database}?${retryWrites ? `retryWrites=${retryWrites}` : ''}${dbW ? `&w=${dbW}` : ''}${authSource ? `&authSource=${authSource}` : ''}${replicaSet ? `&replicaSet=${replicaSet}` : ''}`;
  }
}
