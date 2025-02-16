import { Directive, AfterViewInit } from '@angular/core';
declare var WOW: any;

@Directive({
  selector: '[appWow]'
})
export class WowDirective implements AfterViewInit {

  ngAfterViewInit() {
    new WOW().init();
  }
}