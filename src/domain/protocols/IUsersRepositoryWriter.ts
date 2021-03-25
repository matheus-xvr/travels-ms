import { User } from '@domain/index';

export interface IUsersRepositoryWriter {
  create: (travel: any) => Promise<User>;
}
