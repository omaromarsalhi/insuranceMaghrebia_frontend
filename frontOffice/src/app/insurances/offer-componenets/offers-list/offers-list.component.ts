import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { OfferFiltered } from 'src/app/core/models/my-filtered-offers';
import { OfferControllerService } from 'src/app/core/services/offer-controller.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css'],
  animations: [
    // trigger('fadeInUp', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateY(20px)' }),
    //     animate(
    //       '.8s ease-out',
    //       style({ opacity: 1, transform: 'translateY(0)' })
    //     ),
    //   ]),
    // ]),
    // trigger('fadeInDown', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateY(-20px)' }),
    //     animate(
    //       '.8s ease-out',
    //       style({ opacity: 1, transform: 'translateY(0)' })
    //     ),
    //   ]),
    // ]),
    // // trigger('dynamicAnimation', [
    // //   state(
    // //     'zoom',
    // //     style({
    // //       transform: 'scale(1)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'slide',
    // //     style({
    // //       transform: 'translateX(0)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'rotate',
    // //     style({
    // //       transform: 'rotate(0)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'hover',
    // //     style({
    // //       transform: 'translateY(-7px) scale(1.02)',
    // //       boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
    // //     })
    // //   ),

    // //   // ENTER TRANSITIONS using keyframes for a smoother effect

    // //   transition('void => zoom', [
    // //     animate(
    // //       '600ms ease-out',
    // //       keyframes([
    // //         style({
    // //           transform: 'scale(0.8) translateY(40px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'scale(1.1) translateY(-10px)',
    // //           opacity: 0.7,
    // //           boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    // //           offset: 0.7,
    // //         }),
    // //         style({
    // //           transform: 'scale(1) translateY(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('void => slide', [
    // //     animate(
    // //       '650ms ease-out',
    // //       keyframes([
    // //         style({
    // //           transform: 'translateX(-150px) translateY(30px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'translateX(20px) translateY(0)',
    // //           opacity: 0.8,
    // //           boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    // //           offset: 0.8,
    // //         }),
    // //         style({
    // //           transform: 'translateX(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('void => rotate', [
    // //     animate(
    // //       '700ms ease-out',
    // //       keyframes([
    // //         style({
    // //           transform: 'rotate(-20deg) translateY(40px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'rotate(5deg) translateY(0)',
    // //           opacity: 0.8,
    // //           boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    // //           offset: 0.8,
    // //         }),
    // //         style({
    // //           transform: 'rotate(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   // HOVER TRANSITIONS remain similar but with a snappier feel

    // //   transition('* => hover', [
    // //     animate(
    // //       '200ms ease-in-out',
    // //       style({
    // //         transform: 'translateY(-7px) scale(1.02)',
    // //         boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
    // //       })
    // //     ),
    // //   ]),
    // //   transition('hover => *', [
    // //     animate(
    // //       '150ms ease-in-out',
    // //       style({
    // //         transform: 'translateY(0) scale(1)',
    // //         boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //       })
    // //     ),
    // //   ]),

    // //   // EXIT TRANSITIONS using keyframes for a gradual exit

    // //   transition('zoom => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({
    // //           transform: 'scale(1) translateY(0)',
    // //           opacity: 1,
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'scale(0.9) translateY(20px)',
    // //           opacity: 0.5,
    // //           offset: 0.5,
    // //         }),
    // //         style({
    // //           transform: 'scale(0.8) translateY(40px)',
    // //           opacity: 0,
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('slide => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
    // //         style({ transform: 'translateX(30px)', opacity: 0.5, offset: 0.5 }),
    // //         style({ transform: 'translateX(50px)', opacity: 0, offset: 1 }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('rotate => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({ transform: 'rotate(0)', opacity: 1, offset: 0 }),
    // //         style({ transform: 'rotate(5deg)', opacity: 0.5, offset: 0.5 }),
    // //         style({ transform: 'rotate(10deg)', opacity: 0, offset: 1 }),
    // //       ])
    // //     ),
    // //   ]),
    // // ]),
    // // trigger('dynamicAnimation', [
    // //   state(
    // //     'zoom',
    // //     style({
    // //       transform: 'scale(1)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'slide',
    // //     style({
    // //       transform: 'translateX(0)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'fade',
    // //     style({
    // //       opacity: 1,
    // //       filter: 'blur(0)',
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'bounce',
    // //     style({
    // //       transform: 'translateY(0)',
    // //       opacity: 1,
    // //       boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //     })
    // //   ),
    // //   state(
    // //     'hover',
    // //     style({
    // //       transform: 'translateY(-7px) scale(1.02)',
    // //       boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
    // //     })
    // //   ),

    // //   // ENTER TRANSITIONS
    // //   transition('void => zoom', [
    // //     animate(
    // //       '600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    // //       keyframes([
    // //         style({
    // //           transform: 'scale(0.5) translateY(60px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'scale(1.2) translateY(-15px)',
    // //           opacity: 0.8,
    // //           boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    // //           offset: 0.7,
    // //         }),
    // //         style({
    // //           transform: 'scale(0.95) translateY(5px)',
    // //           offset: 0.85,
    // //         }),
    // //         style({
    // //           transform: 'scale(1) translateY(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('void => slide', [
    // //     animate(
    // //       '650ms cubic-bezier(0.23, 1, 0.32, 1)',
    // //       keyframes([
    // //         style({
    // //           transform: 'translateX(-200px) translateY(40px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'translateX(30px) translateY(-10px)',
    // //           opacity: 0.8,
    // //           boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    // //           offset: 0.7,
    // //         }),
    // //         style({
    // //           transform: 'translateX(-10px) translateY(0)',
    // //           offset: 0.85,
    // //         }),
    // //         style({
    // //           transform: 'translateX(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('void => fade', [
    // //     animate(
    // //       '500ms ease-out',
    // //       keyframes([
    // //         style({
    // //           opacity: 0,
    // //           filter: 'blur(10px)',
    // //           transform: 'scale(0.95)',
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           opacity: 0.6,
    // //           filter: 'blur(5px)',
    // //           transform: 'scale(1)',
    // //           offset: 0.6,
    // //         }),
    // //         style({
    // //           opacity: 1,
    // //           filter: 'blur(0)',
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('void => bounce', [
    // //     animate(
    // //       '700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    // //       keyframes([
    // //         style({
    // //           transform: 'translateY(-100px)',
    // //           opacity: 0,
    // //           boxShadow: '0 0 0 rgba(0,0,0,0)',
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'translateY(30px)',
    // //           opacity: 0.8,
    // //           boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    // //           offset: 0.6,
    // //         }),
    // //         style({
    // //           transform: 'translateY(-15px)',
    // //           offset: 0.8,
    // //         }),
    // //         style({
    // //           transform: 'translateY(0)',
    // //           opacity: 1,
    // //           boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   // HOVER TRANSITIONS
    // //   transition('* => hover', [
    // //     animate(
    // //       '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    // //       style({
    // //         transform: 'translateY(-7px) scale(1.02)',
    // //         boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
    // //       })
    // //     ),
    // //   ]),
    // //   transition('hover => *', [
    // //     animate(
    // //       '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    // //       style({
    // //         transform: 'translateY(0) scale(1)',
    // //         boxShadow: '0 0 20px rgba(0,0,0,0.15)',
    // //       })
    // //     ),
    // //   ]),

    // //   // EXIT TRANSITIONS
    // //   transition('zoom => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({
    // //           transform: 'scale(1)',
    // //           opacity: 1,
    // //           offset: 0,
    // //         }),
    // //         style({
    // //           transform: 'scale(0.8) translateY(30px)',
    // //           opacity: 0.3,
    // //           offset: 0.7,
    // //         }),
    // //         style({
    // //           transform: 'scale(0.5) translateY(60px)',
    // //           opacity: 0,
    // //           offset: 1,
    // //         }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('slide => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
    // //         style({ transform: 'translateX(50px)', opacity: 0.5, offset: 0.5 }),
    // //         style({ transform: 'translateX(100px)', opacity: 0, offset: 1 }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('fade => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({ opacity: 1, filter: 'blur(0)', offset: 0 }),
    // //         style({ opacity: 0.5, filter: 'blur(5px)', offset: 0.5 }),
    // //         style({ opacity: 0, filter: 'blur(10px)', offset: 1 }),
    // //       ])
    // //     ),
    // //   ]),

    // //   transition('bounce => void', [
    // //     animate(
    // //       '300ms ease-in',
    // //       keyframes([
    // //         style({ transform: 'translateY(0)', opacity: 1, offset: 0 }),
    // //         style({
    // //           transform: 'translateY(-30px)',
    // //           opacity: 0.7,
    // //           offset: 0.3,
    // //         }),
    // //         style({ transform: 'translateY(100px)', opacity: 0, offset: 1 }),
    // //       ])
    // //     ),
    // //   ]),
    // // ]),
    trigger('dynamicAnimation', [
      // STATES
      state(
        'zoom',
        style({
          transform: 'scale(1)',
          opacity: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        })
      ),
      state(
        'slideLeft',
        style({
          transform: 'translateX(0)',
          opacity: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        })
      ),
      state(
        'slideRight',
        style({
          transform: 'translateX(0)',
          opacity: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        })
      ),
      state(
        'float',
        style({
          transform: 'translateY(0)',
          opacity: 1,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        })
      ),
      state(
        'hover',
        style({
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
        })
      ),

      // ENTER TRANSITIONS
      transition('void => zoom', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('800ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),

      // Slide from LEFT
      transition('void => slideLeft', [
        style({ transform: 'translateX(-30px)', opacity: 0 }),
        animate(
          '800ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),

      // Slide from RIGHT (NEW)
      transition('void => slideRight', [
        style({ transform: 'translateX(30px)', opacity: 0 }),
        animate(
          '800ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),

      transition('void => float', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate(
          '900ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),

      // HOVER TRANSITION
      transition('* => hover', [
        animate(
          '300ms ease-out',
          style({
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
          })
        ),
      ]),
      transition('hover => *', [
        animate(
          '400ms ease-out',
          style({
            transform: 'translateY(0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          })
        ),
      ]),

      // EXIT TRANSITIONS
      transition('* => void', [
        animate(
          '600ms ease-out',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class OffersListComponent implements OnInit {
  activeFilter = '*';
  offerList!: OfferFiltered[];
  categoryId!: string;
  mySet: Set<string> = new Set();
  tagsList: string[] = [];
  baseAnimations: string[] = [
    'zoom',
    'slideLeft',
    'slideRight',
    'float',
    'hover',
  ];
  animations: string[] = [];


  constructor(
    private offerService: OfferControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId') || 'null';
      this._loadOffers();
    });
  }

  onHover(item: any, isHover: boolean) {
    item.hover = isHover;
  }
  setFilter(filter: string) {
    this.activeFilter = filter;
  }
  get filteredItems() {
    if (this.activeFilter === '*') return this.offerList;

    return this.offerList
      .filter((item) => item.classes?.includes(this.activeFilter))
      .map((item) => {
        item.animation =
          this.animations[this.tagsList.indexOf(this.activeFilter)];
        return item;
      });
  }

  private _getTags() {
    this.offerList.forEach((offer) => {
      offer.animation = this.baseAnimations[0];
      offer.classes = 'item';
      offer.tags?.forEach((tag) => {
        this.mySet.add(tag);
        offer.classes += ' ';
        offer.classes += tag;
      });
    });
    this.tagsList = Array.from(this.mySet);

    this.tagsList.forEach((tag, index) => {
      this.animations.push(
        this.baseAnimations[index % this.baseAnimations.length]
      );
    });

    console.log(this.animations);
    console.log(this.offerList);
  }
  private _loadOffers() {
    const param = {
      categoryId: this.categoryId,
    };
    this.offerService.getAllByCategoryId(param).subscribe((offers) => {
      this.offerList = offers;
      this._getTags();
    });
  }
}
