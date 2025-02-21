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

import { uploadImage } from '../fn/image-upload-controller/upload-image';
import { UploadImage$Params } from '../fn/image-upload-controller/upload-image';

@Injectable({ providedIn: 'root' })
export class ImageUploadControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadImage()` */
  static readonly UploadImagePath = '/api/v1/images/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage$Response(params?: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return uploadImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage(params?: UploadImage$Params, context?: HttpContext): Observable<string> {
    return this.uploadImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
