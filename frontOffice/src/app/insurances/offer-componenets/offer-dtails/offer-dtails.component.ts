import { ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { OfferResponse } from 'src/app/core/models/offer/offer-response';
import { OfferControllerService } from 'src/app/core/services/offer/offer-controller.service';

@Component({
  selector: 'app-offer-dtails',
  templateUrl: './offer-dtails.component.html',
  styleUrls: ['./offer-dtails.component.css'],
})
export class OfferDtailsComponent implements OnInit {
  offerDetails!: OfferResponse;
  offerId!: string;
  @ViewChildren('featureItem') featureItems!: QueryList<ElementRef>;

  constructor(
    private offerService: OfferControllerService,
    private route: ActivatedRoute,
    private scroller: ViewportScroller,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.scroller.scrollToPosition([0, 0]);
      });
  }

  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('offerId') || 'null';
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
    this.offerService
      .getByOfferId({ offerId: this.offerId })
      .subscribe((offer) => {
        this.offerDetails = offer;
        console.log(this.offerDetails);
      });
  }
}
