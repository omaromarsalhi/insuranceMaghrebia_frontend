/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfferGeneralResponse } from '../../models/offer-general-response';
import { OfferStateRequest } from '../../models/offer-state-request';

export interface UpdateStatus$Params {
      body: OfferStateRequest
}

export function updateStatus(http: HttpClient, rootUrl: string, params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<OfferGeneralResponse>> {
  const rb = new RequestBuilder(rootUrl, updateStatus.PATH, 'patch');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfferGeneralResponse>;
    })
  );
}

updateStatus.PATH = '/api/v1/offers';
