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
import { OfferFiltered } from 'src/app/core/models';
import { OfferControllerService } from 'src/app/core/services/offer/offer-controller.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css'],
  animations: [
    trigger('dynamicAnimation', [
      // STATES
      state('zoom', style({
        transform: 'scale(1)',
        opacity: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      })),
    
      state('slideLeft', style({
        transform: 'translateX(0)',
        opacity: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      })),
    
      state('slideRight', style({
        transform: 'translateX(0)',
        opacity: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      })),
    
      state('float', style({
        transform: 'translateY(0)',
        opacity: 1,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      })),
    
      state('hover', style({
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
      })),
    
      // ENTER TRANSITIONS
      transition('void => zoom', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('500ms ease-out')
      ]),
    
      transition('void => slideLeft', [
        style({ transform: 'translateX(-40px)', opacity: 0 }),
        animate('500ms ease-out')
      ]),
    
      transition('void => slideRight', [
        style({ transform: 'translateX(40px)', opacity: 0 }),
        animate('500ms ease-out')
      ]),
    
      transition('void => float', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('600ms ease-out')
      ]),
    
      // HOVER transitions
      transition('* => hover', [
        animate('300ms ease-in')
      ]),
      transition('hover => *', [
        animate('300ms ease-out')
      ]),
    
      // EXIT transitions
      transition('* => void', [
        animate('400ms ease-in', style({
          opacity: 0,
          transform: 'scale(0.9)'
        }))
      ])
    ])
    
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
