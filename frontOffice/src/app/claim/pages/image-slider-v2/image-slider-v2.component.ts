import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider-v2',
  templateUrl: './image-slider-v2.component.html',
  styleUrls: ['./image-slider-v2.component.css']
})
export class ImageSliderV2Component {
  @Input() images: string[] = [];
  currentIndex = 0;

  next() {
    if (this.images.length > 3) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  prev() {
    if (this.images.length > 3) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  getVisibleImages(): string[] {
    if (this.images.length <= 3) {
      return this.images;
    }
    return [
      this.images[this.currentIndex],
      this.images[(this.currentIndex + 1) % this.images.length],
      this.images[(this.currentIndex + 2) % this.images.length],
    ];
  }
}
