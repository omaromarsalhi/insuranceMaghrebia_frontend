import { Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent {
  loaded: boolean = false;

  constructor() {
    setTimeout(() => {
      this.loaded = true;
    }, 500); // Match fadeOut timing
  }
}
