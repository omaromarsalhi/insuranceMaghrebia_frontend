/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Offer } from '../../models/offer';

export interface GetAllOffers$Params {
}

export function getAllOffers(http: HttpClient, rootUrl: string, params?: GetAllOffers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Offer>>> {
  const rb = new RequestBuilder(rootUrl, getAllOffers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Offer>>;
    })
  );
}

getAllOffers.PATH = '/api/v1/offers';
