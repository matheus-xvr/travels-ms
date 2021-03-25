/* eslint-disable no-restricted-syntax */
import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepositoryReader } from '@domain/index';

@Injectable()
export class EmailValidator {
  constructor(
    @Inject('UsersRepositoryReader')
    private readonly usersRepositoryReader: IUsersRepositoryReader,
  ) { }

  public async hasInUse(email: string): Promise<boolean> {
    const valid = await this.usersRepositoryReader.getBy({
      key: 'email',
      value: email,
    });
    return !!valid;
  }
}
