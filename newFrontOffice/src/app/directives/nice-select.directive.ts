import { Directive, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Directive({
  selector: 'select[appNiceSelect]'
})
export class NiceSelectDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).niceSelect();
  }
}