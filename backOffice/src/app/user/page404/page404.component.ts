import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  link = 'Sorry, page not found';
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.link = 'Sorry, '+  this.route.snapshot.queryParams['token'];
  }

}
