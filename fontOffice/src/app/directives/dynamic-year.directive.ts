import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDynamicYear]'
})
export class DynamicYearDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear().toString();
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', currentYear);
  }
}
