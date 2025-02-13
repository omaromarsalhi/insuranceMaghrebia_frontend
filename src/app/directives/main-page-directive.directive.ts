import { Directive, AfterViewInit, ElementRef } from '@angular/core';
// import * as $ from 'jquery';
import 'appear';
import 'circle-progress';
import 'imagesloaded';
import 'isotope-layout';

declare var $: any;


@Directive({
  selector: '[appMainPage]'
})
export class MainPageDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    $(document).ready(() => {
      this.handlePreloader();
      this.thmOwlInit();
      this.thmTinyInit();
      this.priceFilter();
      this.insubaChart();
      this.initCircleProgress();
      this.initMasonryLayouts();
      this.initPostFilter();
      this.insubaCuvedCircle();
    });
  }

  private handlePreloader() {
    if ($('.preloader').length) {
      $('.preloader').fadeOut();
    }
  }

  private initCircleProgress() {
    if ($('.circle-progress').length) {
      $('.circle-progress').appear(() => {
        $('.circle-progress').each((_: number, element: HTMLElement) => {
          let progress = $(element);
          let progressOptions = progress.data('options');
          progress.circleProgress(progressOptions);
        });
      });
    }
  }

  private initMasonryLayouts() {
    if ($('.masonry-layout').length) {
      $('.masonry-layout').imagesLoaded(() => {
        $('.masonry-layout').isotope({ layoutMode: 'masonry' });
      });
    }

    if ($('.fitRow-layout').length) {
      $('.fitRow-layout').imagesLoaded(() => {
        $('.fitRow-layout').isotope({ layoutMode: 'fitRows' });
      });
    }
  }

  private initPostFilter() {
    if ($('.post-filter').length) {
      let postFilterList = $('.post-filter li');

      $('.filter-layout').isotope({
        filter: '.filter-item',
        animationOptions: { duration: 500, easing: 'linear', queue: false }
      });

      postFilterList.on('click', (event: JQuery.ClickEvent) => {
        let self = $(event.currentTarget);
        let selector = self.attr('data-filter') || '*';

        postFilterList.removeClass('active');
        self.addClass('active');

        $('.filter-layout').isotope({
          filter: selector,
          animationOptions: { duration: 500, easing: 'linear', queue: false }
        });
      });
    }

    if ($('.post-filter.has-dynamic-filter-counter').length) {
      $('.post-filter.has-dynamic-filter-counter').find('li').each((_: number, element: HTMLElement) => {
        let filterElement = $(element).data('filter');
        let count = $('.filter-layout').find(filterElement).length;
        $(element).append(`<sup>[${count}]</sup>`);
      });
    }
  }

  private thmOwlInit() {
    // Implement Owl Carousel initialization
  }

  private thmTinyInit() {
    // Implement Tiny Slider initialization
  }

  private priceFilter() {
    // Implement price filter logic
  }

  private insubaChart() {
    // Implement chart logic
  }

  private insubaCuvedCircle() {
    // Implement curved circle logic
  }
}
