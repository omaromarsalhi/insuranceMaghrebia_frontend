/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { BenefitTypeDto } from './benefit-type-dto';
import { FilteredCategoryDto } from './filtered-category-dto';
import { OfferLabelDto } from './offer-label-dto';
import { OfferPackageDto } from './offer-package-dto';
export interface OfferRequest {
  benefits?: Array<BenefitTypeDto>;
  category: FilteredCategoryDto;
  formId?: string;
  header: string;
  imageUri?: string;
  labels?: Array<OfferLabelDto>;
  name: string;
  packages?: Array<OfferPackageDto>;
  tags?: Array<string>;
}
