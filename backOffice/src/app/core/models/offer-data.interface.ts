import { FilteredCategoryDto } from '../models/filtered-category-dto';
import { OfferLabelDto } from '../models/offer-label-dto';


export interface OfferData {
    offerName: string;
    offerHeader: string;
    category: FilteredCategoryDto;
    imageUri?: string;
    labels?: OfferLabelDto[];
  }
  
  