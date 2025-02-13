import { Directive, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import { WOW } from 'wowjs';

@Directive({
  selector: '[appWow]'
})
export class WowDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.el.nativeElement.querySelector('.wow')) {
      const wow = new WOW({
        boxClass: 'wow', 
        animateClass: 'animated', 
        mobile: true, 
        live: true
      });
      wow.init();
    }
  }
}
