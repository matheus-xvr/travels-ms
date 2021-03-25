import { User } from '@domain/index';

export interface IUsersRepositoryReader {
  getBy: ({ key, value }) => Promise<User>;
  list: (queryParams?: any) => Promise<any>;
}
