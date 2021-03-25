import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { EmailValidator, IUsersRepositoryWriter, User } from '@domain/index';
import { CreateUserDto } from '@src/interface';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UsersRepositoryWriter')
    private readonly usersRepositoryWriter: IUsersRepositoryWriter,
    private readonly emailValidator: EmailValidator,
  ) { }

  public async invoke(reqBody: CreateUserDto): Promise<User> {
    const user = new User(reqBody);
    if (await this.emailValidator.hasInUse(user.getEmail())) {
      throw new UnprocessableEntityException('E-mail already in use');
    }

    return this.usersRepositoryWriter.create(user);
  }
}
