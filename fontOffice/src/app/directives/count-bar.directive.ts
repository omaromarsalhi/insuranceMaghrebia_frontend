import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCountBar]'
})
export class CountBarDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const el = this.el.nativeElement;

    // Get the data-percent value from the element
    const percent = el.getAttribute('data-percent') || '0%';  // Default to '0%' if not set

    // Set initial width to 0%
    this.renderer.setStyle(el, 'width', '0%');

    // Create an IntersectionObserver to check when the element enters the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate width to the value stored in data-percent
          this.renderer.setStyle(el, 'width', percent);
          this.renderer.addClass(el, 'counted');  // Optional: add class once animated
          observer.disconnect();  // Stop observing after the animation
        }
      });
    }, { threshold: 0.5 });  // Trigger when 50% of the element is visible

    observer.observe(el);  // Start observing the element
  }
}
