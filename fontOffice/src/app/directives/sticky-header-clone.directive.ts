import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appStickyHeaderClone]',
})
export class StickyHeaderCloneDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.cloneStickyHeader();
  }

  private cloneStickyHeader() {
    const headerElement = this.el.nativeElement;
    if (window.innerWidth > 768) {
      const clonedHeader = headerElement.cloneNode(true);
      this.renderer.addClass(clonedHeader, 'sticky-header--cloned');
      headerElement.parentElement.appendChild(clonedHeader);
    }
  }
}
