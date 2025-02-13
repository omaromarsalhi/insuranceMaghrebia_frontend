import {
  Directive,
  HostListener,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCustomCursor]',
})
export class CustomCursorDirective implements OnInit {
  private cursor!: HTMLElement;
  private cursorInner!: HTMLElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Create outer and inner cursor elements
    this.cursor = this.createCursorElement('custom-cursor__cursor');
    this.cursorInner = this.createCursorElement('custom-cursor__cursor-two');

    // Append them to the body
    this.renderer.appendChild(document.body, this.cursor);
    this.renderer.appendChild(document.body, this.cursorInner);

    // Ensure they're styled initially
    this.updateCursorPosition(0, 0, this.cursor);
    this.updateCursorPosition(0, 0, this.cursorInner);
  }

  private createCursorElement(className: string): HTMLElement {
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, className);
    return div;
  }

  private updateCursorPosition(
    x: number,
    y: number,
    element: HTMLElement
  ): void {
    this.renderer.setStyle(
      element,
      'transform',
      `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
    );
  }

  private updateCursorInnerPosition(
    x: number,
    y: number,
    element: HTMLElement
  ): void {
    this.renderer.setStyle(element, 'left', `${x}px`);
    this.renderer.setStyle(element, 'top', `${y}px`);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.updateCursorPosition(event.clientX, event.clientY, this.cursor);
    this.updateCursorInnerPosition(
      event.clientX,
      event.clientY,
      this.cursorInner
    );
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.renderer.addClass(this.cursor, 'click');
    this.renderer.addClass(this.cursorInner, 'custom-cursor__innerhover');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.renderer.removeClass(this.cursor, 'click');
    this.renderer.removeClass(this.cursorInner, 'custom-cursor__innerhover');
  }

  @HostListener('document:mouseover', ['$event.target'])
  onMouseOver(target: HTMLElement): void {
    if (target.tagName === 'A') {
      this.renderer.addClass(this.cursor, 'custom-cursor__hover');
    } else this.renderer.removeClass(this.cursor, 'custom-cursor__hover');
  }
}
