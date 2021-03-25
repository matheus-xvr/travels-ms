/* eslint-disable @typescript-eslint/lines-between-class-members */
import { v4 as uuid } from 'uuid';

export class User {
  private user_id: string;
  private name: string;
  private email: string;
  private admin: boolean;

  constructor({
    user_id = null,
    name = null,
    email = null,
    admin = false,
  }) {
    this.user_id = user_id || uuid();
    this.name = name;
    this.email = email;
    this.admin = admin;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public isAdmin(): boolean {
    return this.admin;
  }
}
