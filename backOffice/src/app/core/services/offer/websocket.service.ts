import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Observable, Subject, EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private session;

  constructor() {}

  public connect(session): void {
    this.session = session;
    this.socket$ = webSocket({
      url: "ws://localhost:9200/ws/" + this.session,
      serializer: (msg) => JSON.stringify(msg),
      deserializer: ({ data }) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error("Failed to parse message:", data, error);
          return { type: "error", content: "Invalid message format" };
        }
      },
      openObserver: {
        next: () => {
          console.log("WebSocket connection established");
        },
      },
      closeObserver: {
        next: () => {
          console.log("WebSocket connection closed");
        },
      },
    });

    this.socket$
      .pipe(
        tap({
          next: (msg) => this.messagesSubject.next(msg),
          error: (err) => {
            console.error("WebSocket error:", err);
          },
        }),
        catchError((error) => EMPTY)
      )
      .subscribe();
  }

  sendMessage(message: string): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(message);
    } else {
      console.error("WebSocket connection is closed");
    }
  }

  close(): void {
    this.socket$.complete();
  }
}
