import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productModel, productList } from '../product.model';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})

/**
 * Ecommerce product-detail component
 */
export class OfferDetailsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  public productDetail: productModel[];

  isImage;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params =>
      this.productDetail = productList.filter(function (product) {
        return product.id == parseInt(params.id)
      })
    );
    this.isImage = this.productDetail[0].images[0];
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Insurance' }, { label: 'Product Detail', active: true }];
  }

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    this.isImage = image;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }
}
