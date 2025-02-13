import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'ion-rangeslider';

@Directive({
  selector: '[appInsuranceProgressRange]'
})
export class InsuranceProgressRangeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const slider = this.el.nativeElement.querySelector('.balance-range-slider');

    if (slider) {
      ($(slider) as any).ionRangeSlider({
        onStart: (data: any) => {
          const balanceTag = this.el.nativeElement.querySelector('.contact__form__insurance-balance span');
          const balanceInput = this.el.nativeElement.querySelector('.contact__form__insurance-balance__input');
          balanceTag.innerHTML = data.from;
          balanceInput.value = data.from;
        },
        onChange: (data: any) => {
          const balanceTag = this.el.nativeElement.querySelector('.contact__form__insurance-balance span');
          const balanceInput = this.el.nativeElement.querySelector('.contact__form__insurance-balance__input');
          balanceTag.innerHTML = data.from;
          balanceInput.value = data.from;
        }
      });
    }
  }
}
