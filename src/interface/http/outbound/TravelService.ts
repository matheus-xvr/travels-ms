import { HttpStatus, Injectable } from '@nestjs/common';
import { Cache } from '@src/infrastructure';
import { TravelHttpRequest } from '@src/infrastructure/http/clients/TravelHttpRequest';
import { ITravelService } from '@src/interface/http/outbound/protocols/ITravelService';

@Injectable()
export class TravelService implements ITravelService {
  constructor(
    private readonly travelHttpRequest: TravelHttpRequest,
    private readonly cache: Cache,
  ) { }

  public async getContent(): Promise<any> {
    try {
      const { data, headers } = await this.travelHttpRequest.get();
      if (!this.cache.has('set-cookie')) {
        this.cache.set('set-cookie', headers['set-cookie']);
      }
      return data;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return null;
      }
      throw error;
    }
  }
}
