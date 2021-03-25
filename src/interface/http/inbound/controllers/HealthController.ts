import { MongoClient } from 'mongodb';
import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { CustomLogger } from '@infrastructure/index';

enum HealthStatus {
  UP = 'up',
  DOWN = 'down',
}

@Controller()
export class HealthController {
  private readonly message: string = 'service activated and connected to the database';

  private readonly errorMessage: string = 'error when performing a database query: ';

  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly db: MongoClient,
    private readonly logger: CustomLogger,
  ) { }

  @Get('/healthcheck')
  public async healthCheck() {
    try {
      if (!this.db.isConnected()) {
        throw new Error('lost connection with mongodb');
      }
      return {
        status: HealthStatus.UP,
        message: this.message,
      };
    } catch (error) {
      await this.db.close();
      this.logger.error(this.errorMessage + error.message);
      throw new InternalServerErrorException(this.errorMessage + error.message);
    }
  }

  @Get('/info')
  public async serverInfo() {
    try {
      if (!this.db.isConnected()) {
        throw new Error('lost connection with mongodb');
      }
      return {
        status: HealthStatus.UP,
        message: this.message,
      };
    } catch (error) {
      await this.db.close();
      this.logger.error(this.errorMessage + error.message);
      throw new InternalServerErrorException(this.errorMessage + error.message);
    }
  }
}
