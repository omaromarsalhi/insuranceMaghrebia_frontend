/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfferRequest } from '../../models/offer/offer-request';
import { OfferResponse } from '../../models/offer/offer-response';

export interface CreateOffer$Params {
      body: OfferRequest
}

export function createOffer(http: HttpClient, rootUrl: string, params: CreateOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<OfferResponse>> {
  const rb = new RequestBuilder(rootUrl, createOffer.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfferResponse>;
    })
  );
}

createOffer.PATH = '/api/v1/offers';
