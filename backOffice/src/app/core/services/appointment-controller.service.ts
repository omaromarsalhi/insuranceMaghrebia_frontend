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

import { AppointmentDto } from '../models/appointment-dto';
import { getAll } from '../fn/appointment-controller/get-all';
import { GetAll$Params } from '../fn/appointment-controller/get-all';
import { save } from '../fn/appointment-controller/save';
import { Save$Params } from '../fn/appointment-controller/save';

@Injectable({ providedIn: 'root' })
export class AppointmentControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/api/v1/appointments/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<any> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `getAll()` */
  static readonly GetAllPath = '/api/v1/appointments/getAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params?: GetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AppointmentDto>>> {
    return getAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params?: GetAll$Params, context?: HttpContext): Observable<Array<AppointmentDto>> {
    return this.getAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AppointmentDto>>): Array<AppointmentDto> => r.body)
    );
  }

}
