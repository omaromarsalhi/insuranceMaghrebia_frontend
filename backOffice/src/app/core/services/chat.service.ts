// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9100/chat/';

  constructor(private http: HttpClient) { }

  chat(userInput: string): Observable<any> {
    return this.http.post(this.apiUrl, { user_input: userInput });
  }
}