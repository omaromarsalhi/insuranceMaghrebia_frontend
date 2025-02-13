import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCountBox]'
})
export class CountBoxDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const el = this.el.nativeElement;
    const countText = el.querySelector('.count-text');

    if (countText) {
      const stop = parseInt(countText.getAttribute('data-stop'), 10);  // Get the 'data-stop' value
      const speed = parseInt(countText.getAttribute('data-speed'), 10);  // Get the 'data-speed' value

      if (!el.classList.contains('counted')) {
        el.classList.add('counted');

        // Animate the count
        let currentCount = 0;
        const interval = setInterval(() => {
          currentCount += 1;
          countText.textContent = currentCount.toString();

          if (currentCount >= stop) {
            clearInterval(interval);  // Stop animation when target count is reached
            countText.textContent = stop.toString();  // Set the final value
          }
        }, speed / stop); // Speed per step
      }
    }
  }
}
