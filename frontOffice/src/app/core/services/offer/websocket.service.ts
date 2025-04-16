import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor() {
  }

  public connect(): void {
    this.socket$ = webSocket({
      url: 'ws://localhost:9100/ws',
      serializer: msg => JSON.stringify(msg),
      deserializer: ({ data }) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('Failed to parse message:', data, error);
          return { type: 'error', content: 'Invalid message format' };
        }
      },
      openObserver: {
        next: () => {
          console.log('WebSocket connection established');
          this.reconnectAttempts = 0;
        }
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket connection closed');
          this.reconnect();
        }
      }
    });

    this.socket$.pipe(
      tap({
        next: (msg) => this.messagesSubject.next(msg),
        error: (err) => {
          console.error('WebSocket error:', err);
          this.reconnect();
        }
      }),
      catchError(error => EMPTY)
    ).subscribe();
  }

  private reconnect(): void {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      console.log(`Reconnecting attempt ${this.reconnectAttempts}`);
      setTimeout(() => this.connect(), 3000);
    } else {
      console.error('Max reconnect attempts reached');
      this.messagesSubject.next({
        type: 'error',
        content: 'Connection lost. Please refresh the page.'
      });
    }
  }

  sendMessage(message: string): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next({ content: message });
    } else {
      console.error('WebSocket connection is closed');
    }
  }

  close(): void {
    this.socket$.complete();
  }
}