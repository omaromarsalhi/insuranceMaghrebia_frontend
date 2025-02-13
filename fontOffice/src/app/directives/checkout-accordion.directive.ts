import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCheckoutAccordion]'
})
export class CheckoutAccordionDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const items = this.el.nativeElement.querySelectorAll('.checkout-page__payment__item');
    
    items.forEach((item: HTMLElement) => {
      const title = item.querySelector('.checkout-page__payment__title');
      const content = item.querySelector('.checkout-page__payment__content');

      if (title && content) {
        if (!item.classList.contains('checkout-page__payment__item--active')) {
          content.setAttribute('style', 'display: none;');
        }
        
        title.addEventListener('click', (e) => {
          e.preventDefault();
          
          items.forEach((i: HTMLElement) => {
            i.classList.remove('checkout-page__payment__item--active');
            i.querySelector('.checkout-page__payment__content')?.setAttribute('style', 'display: none;');
          });

          item.classList.add('checkout-page__payment__item--active');
          content.setAttribute('style', 'display: block;');
        });
      }
    });
  }
}
