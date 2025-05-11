import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var WOW: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUrl: string = '';

  constructor(private router: Router) {}

  title = 'insuranceUi';

  ngOnInit(): void {
    // Initialize WOW.js
    new WOW().init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url; 
      }
    });
  }
  
}
