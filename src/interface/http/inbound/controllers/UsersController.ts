import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Inject,
} from '@nestjs/common';

import { CreateUserDto } from '@interface/index';
import { CreateUser } from '@application/index';
import { ReqLogger } from '@utils/ReqLoggerDecorator';
import { User } from '@src/domain';
import { serializeUser } from '@interface/http/outbound/serializers/UserSerializer';

const API_VERSION = process.env.API_VERSION || 'v1';

@ApiTags('users')
@Controller(`${API_VERSION}/users`)
export class UsersController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser,
  ) { }

  @ApiBody({ type: () => CreateUserDto })
  @Post()
  @ReqLogger('/users')
  public async create(@Body() data: CreateUserDto): Promise<User> {
    return serializeUser(
      await this.createUser.invoke(data),
    );
  }
}
