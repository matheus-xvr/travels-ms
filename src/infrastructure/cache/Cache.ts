import { Injectable } from '@nestjs/common';

@Injectable()
export class Cache {
  private readonly cache;

  constructor() {
    this.cache = new Map();
  }

  public has(key: string) {
    return this.cache.has(key);
  }

  public set(key: string, value: any) {
    return this.cache.set(key, [value, Date.now()]);
  }

  public get(key: string) {
    return this.cache.get(key)[0];
  }

  public delete(key: string) {
    return this.cache.delete(key);
  }

  public clear() {
    return this.cache.clear();
  }

  public isExpired(key: string, seconds: number) {
    const [, timestamp] = this.cache.get(key);
    const wasExpired = (Date.now() - timestamp) / 1000 > seconds;
    if (wasExpired) {
      this.cache.delete(key);
    }
    return wasExpired;
  }
}
