/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

<<<<<<< HEAD
import { OfferControllerService } from './services/offer/offer-controller.service';
import { OfferFormControllerService } from './services/offer/offer-form-controller.service';
import { OfferCategoryControllerService } from './services/offer/offer-category-controller.service';
import { PurchasedOfferControllerService } from './services/offer/purchased-offer-controller.service';
import { ImageUploadControllerService } from './services/offer/image-upload-controller.service';
=======
import { OfferControllerService } from './services/offer-controller.service';
import { OfferCategoryControllerService } from './services/offer-category-controller.service';
import { ImageUploadControllerService } from './services/image-upload-controller.service';
>>>>>>> payment_branch

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    OfferControllerService,
<<<<<<< HEAD
    OfferFormControllerService,
    OfferCategoryControllerService,
    PurchasedOfferControllerService,
=======
    OfferCategoryControllerService,
>>>>>>> payment_branch
    ImageUploadControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
