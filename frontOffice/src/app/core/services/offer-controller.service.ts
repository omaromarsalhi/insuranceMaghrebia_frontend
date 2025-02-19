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

import { deleteOffer } from '../fn/offer-controller/delete-offer';
import { DeleteOffer$Params } from '../fn/offer-controller/delete-offer';
import { getAllOffers } from '../fn/offer-controller/get-all-offers';
import { GetAllOffers$Params } from '../fn/offer-controller/get-all-offers';
import { getOfferById } from '../fn/offer-controller/get-offer-by-id';
import { GetOfferById$Params } from '../fn/offer-controller/get-offer-by-id';
import { Offer } from '../models/offer';
import { updateOffer } from '../fn/offer-controller/update-offer';
import { UpdateOffer$Params } from '../fn/offer-controller/update-offer';

@Injectable({ providedIn: 'root' })
export class OfferControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOfferById()` */
  static readonly GetOfferByIdPath = '/api/v1/offers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOfferById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfferById$Response(params: GetOfferById$Params, context?: HttpContext): Observable<StrictHttpResponse<Offer>> {
    return getOfferById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOfferById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfferById(params: GetOfferById$Params, context?: HttpContext): Observable<Offer> {
    return this.getOfferById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Offer>): Offer => r.body)
    );
  }

  /** Path part for operation `updateOffer()` */
  static readonly UpdateOfferPath = '/api/v1/offers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOffer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOffer$Response(params: UpdateOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<Offer>> {
    return updateOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOffer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOffer(params: UpdateOffer$Params, context?: HttpContext): Observable<Offer> {
    return this.updateOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Offer>): Offer => r.body)
    );
  }

  /** Path part for operation `deleteOffer()` */
  static readonly DeleteOfferPath = '/api/v1/offers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOffer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOffer$Response(params: DeleteOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOffer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOffer(params: DeleteOffer$Params, context?: HttpContext): Observable<void> {
    return this.deleteOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllOffers()` */
  static readonly GetAllOffersPath = '/api/v1/offers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOffers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOffers$Response(params?: GetAllOffers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Offer>>> {
    return getAllOffers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOffers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOffers(params?: GetAllOffers$Params, context?: HttpContext): Observable<Array<Offer>> {
    return this.getAllOffers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Offer>>): Array<Offer> => r.body)
    );
  }



}
