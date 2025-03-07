import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferResponse } from 'src/app/core/models';
import { OfferControllerService } from 'src/app/core/services';

@Component({
  selector: 'app-offer-dtails',
  templateUrl: './offer-dtails.component.html',
  styleUrls: ['./offer-dtails.component.css'],
})
export class OfferDtailsComponent implements OnInit {
  offerDetails!: OfferResponse;
  categoryId!: string;
  @ViewChildren('featureItem') featureItems!: QueryList<ElementRef>;

  constructor(
    private offerService: OfferControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || 'null';
    console.log('Form ID:', this.categoryId);
    this._loadOffers();
  }

  testimonialItemsSliderConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    infinite: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  questionSliderConfig = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  private _loadOffers() {
    const param={
      categoryId:this.categoryId
    }
    this.offerService.getOne(param).subscribe((offer) => {
      this.offerDetails = offer;
      console.log(this.offerDetails);
    });
  }
}
