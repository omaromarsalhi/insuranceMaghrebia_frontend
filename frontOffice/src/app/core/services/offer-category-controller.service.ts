/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';


import { getAllOfferCategories } from '../fn/offer-category-controller/get-all-offer-categories';
import { GetAllOfferCategories$Params } from '../fn/offer-category-controller/get-all-offer-categories';
import { getOfferCategoryById } from '../fn/offer-category-controller/get-offer-category-by-id';
import { GetOfferCategoryById$Params } from '../fn/offer-category-controller/get-offer-category-by-id';
import { OfferCategory } from '../models/offer-category';


@Injectable({ providedIn: 'root' })

export class OfferCategoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }


  /** Path part for operation `getOfferCategoryById()` */
  static readonly GetOfferCategoryByIdPath = '/api/v1/offer-categories/getOne/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOfferCategoryById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfferCategoryById$Response(params: GetOfferCategoryById$Params, context?: HttpContext): Observable<StrictHttpResponse<OfferCategory>> {
    return getOfferCategoryById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOfferCategoryById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfferCategoryById(params: GetOfferCategoryById$Params, context?: HttpContext): Observable<OfferCategory> {
    return this.getOfferCategoryById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfferCategory>): OfferCategory => r.body)
    );
  }

  /** Path part for operation `getAllOfferCategories()` */
  static readonly GetAllOfferCategoriesPath = '/api/v1/offer-categories/getAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOfferCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfferCategories$Response(params?: GetAllOfferCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OfferCategory>>> {
    return getAllOfferCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOfferCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfferCategories(params?: GetAllOfferCategories$Params, context?: HttpContext): Observable<Array<OfferCategory>> {
    return this.getAllOfferCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OfferCategory>>): Array<OfferCategory> => r.body)
    );
  }



}
