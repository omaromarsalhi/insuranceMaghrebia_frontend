import { AfterViewInit, Component, OnInit } from "@angular/core";

import {
  OfferCategoryControllerService,
  OfferControllerService,
} from "src/app/core/services";
import { CategoryResponse, OfferResponse } from "src/app/core/models";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from "@angular/animations";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-offer-view",
  templateUrl: "./offer-view.component.html",
  styleUrls: ["./offer-view.component.scss"],
  animations: [
    trigger("scaleFade", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "scale(0.95)" })
        ),
      ]),
    ]),
    trigger("slideVertical", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate(
          "300ms 150ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "translateY(-20px)" })
        ),
      ]),
    ]),
    trigger("slideHorizontal", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(30px)" }),
        animate(
          "300ms ease-out",
          style({ opacity: 1, transform: "translateX(0)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "translateX(30px)" })
        ),
      ]),
    ]),
    trigger("fadeAnimation", [
      transition("new => void", [
        // Fade out animation
        animate(
          "200ms ease-in",
          style({ opacity: 0, transform: "translateY(-10px)" })
        ),
      ]),
      transition("void => new", [
        // Fade in for new offers
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate(
          "300ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
      transition("update => void", [
        // Different fade out for updated offers
        animate(
          "150ms ease-in",
          style({ opacity: 0, transform: "translateY(10px)" })
        ),
      ]),
      transition("void => update", [
        // Different fade in for updated offers
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate(
          "250ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
    ]),
    trigger("filterAnimation", [
      transition(":enter", [
        style({ transform: "translateY(-10px)", opacity: 0 }),
        animate(
          "300ms ease-out",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ transform: "translateY(-10px)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class OfferViewComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  offersList: OfferResponse[] = [];
  isLoding: boolean = false;
  selectedOffer: OfferResponse = null;
  animationState: string = "new";
  paginatedOffers: OfferResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  nbrpages: number = 1;
  categories: CategoryResponse[] = [];
  searchTerm = "";
  filteredOffers: OfferResponse[] = [];
  isFilterOpen = false;
  private searchSubject = new Subject<string>();

  constructor(
    private offerService: OfferControllerService,
    private categoryService: OfferCategoryControllerService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Offers" },
      { label: "Offers List", active: true },
    ];
    this._fetchDataC();
    this._fetchData();

    this.setupSearch();
  }

  private _myInit() {
    this.selectOffer(this.offersList[0]);
    this.nbrpages = Math.ceil(this.offersList.length / this.itemsPerPage);
    this.updatePaginatedOffers();
  }

  updatePaginatedOffers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOffers = this.filteredOffers.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.nbrpages) {
      this.currentPage = page;
      this.updatePaginatedOffers();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.nbrpages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  selectOffer(offer: any) {
    if (this.selectedOffer && this.selectedOffer.offerId === offer.offerId) {
      this.animationState = "update";
    } else {
      this.animationState = "new";
    }
    this.selectedOffer = null;
    setTimeout(() => {
      this.selectedOffer = offer;
    }, 500);
  }

  private _fetchData() {
    this.offerService.getAll().subscribe((response: OfferResponse[]) => {
      this.offersList = response;
      this.filteredOffers = [...response];
      this._myInit();
    });
  }

  deletedOffer(offerId: string) {
    this.selectOffer(this.offersList[0] || null);
    this.filteredOffers = this.offersList.filter(
      (offer) => offer.offerId !== offerId
    );

    this.nbrpages = Math.ceil(this.filteredOffers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedOffers();
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  private _fetchDataC() {
    this.categoryService.getAll1().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }

  private setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchSubject.next(value.trim());
  }

  private performSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredOffers = [...this.offersList];
    } else {
      this.filteredOffers = this.offersList.filter((offer) =>
        offer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    this.nbrpages = Math.ceil(this.filteredOffers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedOffers();
  }

  clearSearch() {
    this.searchTerm = "";
    this.searchSubject.next("");
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}
