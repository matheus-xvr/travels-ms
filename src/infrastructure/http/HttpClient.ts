import { Injectable, HttpService, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, retryWhen } from 'rxjs/operators';

import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { genericRetryStrategy } from './GenericRetryStrategy';

const httpAgent = new HttpAgent({ keepAlive: true });
const httpsAgent = new HttpsAgent({ keepAlive: true });

@Injectable()
export class HttpClient {
  private httpConfig: any;

  constructor(
    private readonly httpService: HttpService,
    public configService: ConfigService,
  ) {
    this.httpConfig = configService.get('httpClient');
  }

  public retryableRequest(options: any): Observable<any> {
    return this.httpService
      .request({
        ...options,
        validateStatus: null,
        timeout: this.httpConfig.timeout,
        httpAgent,
        httpsAgent,
      })
      .pipe(
        mergeMap((val) => {
          if (val.status >= HttpStatus.BAD_REQUEST) {
            return throwError(val);
          }
          return of(val);
        }),
        retryWhen(
          genericRetryStrategy(),
        ),
      );
  }
}
