import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appMagnificPopup]'
})
export class MagnificPopupDirective implements AfterViewInit {
  @Input() type: 'image' | 'iframe' = 'image';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.type === 'image') {
      $(this.el.nativeElement).magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    } else if (this.type === 'iframe') {
      $(this.el.nativeElement).magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
      });
    }
  }
}