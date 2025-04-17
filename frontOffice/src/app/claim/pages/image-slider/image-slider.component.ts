import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent {
  @Input() images: string[] = [];

  currentIndex = 0;

  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  slideRight() {
    if (this.currentIndex < this.images.length - 3) {
      this.currentIndex++;
    }
  }

  addImageFromCanvas(canvas: HTMLCanvasElement) {
    const imageData = canvas.toDataURL('image/png'); // Get image as base64
    this.images.push(imageData);
  }

  removeImage(pos: number){
    this.images.splice(pos, 1);
  }
}
