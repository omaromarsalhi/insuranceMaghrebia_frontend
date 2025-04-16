/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

<<<<<<< HEAD
import { CategoryRequest } from '../../models/offer/category-request';
import { CategoryResponse } from '../../models/offer/category-response';

export interface CreateOfferCategory$Params {
      body: CategoryRequest
}

export function createOfferCategory(http: HttpClient, rootUrl: string, params: CreateOfferCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
=======
import { OfferCategory } from '../../models/offer-category';

export interface CreateOfferCategory$Params {
      body: OfferCategory
}

export function createOfferCategory(http: HttpClient, rootUrl: string, params: CreateOfferCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<OfferCategory>> {
>>>>>>> payment_branch
  const rb = new RequestBuilder(rootUrl, createOfferCategory.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
<<<<<<< HEAD
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CategoryResponse>;
=======
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfferCategory>;
>>>>>>> payment_branch
    })
  );
}

createOfferCategory.PATH = '/api/v1/offer-categories/create';
