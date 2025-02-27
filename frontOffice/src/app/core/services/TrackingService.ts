import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Action} from "../models/Action";

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'http://localhost:8091/api/v1/api/v1/userTrack';
  private startTime: number = 0;
  private currentPage: string = '';
  private time!:number;

  constructor(private router: Router, private http: HttpClient) {
    this.trackPageTime();
  }
  private trackPageTime() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.startTime && this.currentPage) {
          const timeSpent = Date.now() - this.startTime;
          this.time = timeSpent;
        }
      }
      if (event instanceof NavigationEnd) {
        this.startTime = Date.now();
        this.currentPage = event.urlAfterRedirects;
        console.log(`📌 Page actuelle : ${this.currentPage}`);
      }
    });
  }
  trackEvent(eventType: string, details: any) {
    if (!this.currentPage) return;
    const timeSpent = (Date.now() - this.startTime) / 1000;
    const action :Action ={
    page: this.currentPage,
    eventType: eventType,
    action: details,
    timeSpent: timeSpent
    };
    this.sendTrackingData("67a9157f0a6a1371dce93411", action).subscribe({
      next: response => console.log('Action enregistrée avec succès !', response),
      error: error => console.error('Erreur lors de l’enregistrement', error)
    });
  }


    sendTrackingData(userId: string, action: any): Observable<any>  {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, action);
  }
}
