import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() endValue: number = 0;
  currentValue: number = 0;

  ngOnInit() {
    this.animateCounter();
  }

  animateCounter() {
    const duration = 3000; // 2 seconds
    const increment = this.endValue / (duration / 100);
    const interval = setInterval(() => {
      this.currentValue += increment;
      if (this.currentValue >= this.endValue) {
        this.currentValue = this.endValue;
        clearInterval(interval);
      }
    }, 100);
  }
}