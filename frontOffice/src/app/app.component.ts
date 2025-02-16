import { Component } from '@angular/core';
declare var WOW: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'insuranceUi';

  ngOnInit(): void {
    // Initialize WOW.js
    new WOW().init();
    console.log("omar salhi is the");

  }


}
