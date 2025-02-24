import { Pipe, PipeTransform } from "@angular/core";
import { OfferCategory } from "../core/models";

@Pipe({
  name: "categoryFilter",
  pure: true,
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categories: OfferCategory[]): OfferCategory[] {
    if (!categories) return [];

    return categories.map((category) => {

      delete category.description;
      delete category.createdAt;
      delete category.imageUri;

      return category;
    });
  }
}
