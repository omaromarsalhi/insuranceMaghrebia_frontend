/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryResponse } from '../../models/offer/category-response';
import { OfferCategory } from '../../models/offer/offer-category';

export interface UpdateOfferCategory$Params {
      body: OfferCategory
}

export function updateOfferCategory(http: HttpClient, rootUrl: string, params: UpdateOfferCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, updateOfferCategory.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CategoryResponse>;
    })
  );
}

updateOfferCategory.PATH = '/api/v1/offer-categories/update';
