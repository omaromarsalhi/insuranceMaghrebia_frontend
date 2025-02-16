import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimation]'
})
export class AnimationDirective implements OnInit {
  @Input() animationType: string = '';
  @Input() animationDelay: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    element.style.animationDelay = this.animationDelay;
    element.classList.add('animated', this.animationType);

    element.addEventListener('animationend', () => {
      element.classList.remove('animated', this.animationType);
    });
  }
}