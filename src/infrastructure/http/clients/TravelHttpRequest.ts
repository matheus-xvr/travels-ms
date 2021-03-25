import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpDispatcher } from '@interface/http/outbound/HttpDispatcher';
import { Cache } from '@src/infrastructure';

@Injectable()
export class TravelHttpRequest {
  private httpConfig: any;

  constructor(
    private readonly httpDispatcher: HttpDispatcher,
    private readonly cache: Cache,
    public configService: ConfigService,
  ) {
    this.httpConfig = configService.get('httpClient').travelService;
  }

  public async get(): Promise<any> {
    return this.httpDispatcher.dispatch(
      this.buildRequestConfigs(),
    );
  }

  private buildRequestConfigs() {
    const Cookie = this.cache.has('set-cookie') ? this.cache.get('set-cookie').map((str: string) => str.split(';')[0]).join('; ') : null;
    return {
      baseURL: this.httpConfig.url.base,
      url: `${this.httpConfig.url.path}`,
      withCredentials: true,
      method: 'get',
      headers: this.makeHeaders(Cookie),
    };
  }

  private makeHeaders(Cookie: string) {
    return (
      Cookie ? {
        'User-Agent': ' * ',
        Disallow: ' /',
        Cookie,
      } : {
        'User-Agent': ' * ',
        Disallow: ' /',
      }
    );
  }
}
