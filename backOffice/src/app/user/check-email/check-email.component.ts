import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  year: number = new Date().getFullYear();
  verify = "verify";
  ngOnInit(): void {
    this.verify = this.route.snapshot.queryParamMap.get('verify');
    document.body.classList.remove('auth-body-bg');
  }

}
