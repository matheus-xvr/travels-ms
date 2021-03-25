import { Injectable } from '@nestjs/common';

import { HttpClient } from '@infrastructure/http/HttpClient';
import { IHttpDispatcher } from './protocols/IHttpDispatcher';

@Injectable()
export class HttpDispatcher implements IHttpDispatcher {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  async dispatch(options: any): Promise<any> {
    return this.httpClient.retryableRequest(options).toPromise();
  }
}
