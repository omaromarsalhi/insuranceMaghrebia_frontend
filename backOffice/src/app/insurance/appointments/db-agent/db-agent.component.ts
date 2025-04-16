import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
} from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { ChatService } from "src/app/core/services/chat.service";
import { WebSocketService } from "src/app/core/services/websocket.service";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

interface ChatMessage {
  type: string;
  content: any;
}

@Component({
  selector: "app-db-agent",
  templateUrl: "./db-agent.component.html",
  styleUrls: ["../../chat/chat.component.scss", "./db-agent.component.scss"],
  animations: [
    trigger("pulse", [
      state(
        "normal",
        style({
          transform: "scale(1)",
          boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
        })
      ),
      state(
        "hover",
        style({
          transform: "scale(1.1)",
          boxShadow: "0 6px 16px rgba(0, 123, 255, 0.4)",
        })
      ),
      transition("normal => hover", animate("200ms ease-out")),
      transition("hover => normal", animate("150ms ease-in")),
      transition(":enter", [
        style({ transform: "scale(0.8)", opacity: 0 }),
        animate(
          "300ms cubic-bezier(0.4, 0, 0.2, 1)",
          style({ transform: "scale(1)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        animate(
          "200ms cubic-bezier(0.4, 0, 0.8, 1)",
          style({ transform: "scale(0.8)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class DbAgentComponent implements OnInit {
  @Input() isChatOpen: boolean;
  @Output() isChatOpenChange = new EventEmitter<boolean>();
  @ViewChild("messageContainer") private messageContainer!: ElementRef;
  buttonState: "normal" | "hover" = "normal";
  showPulse = true;
  messages: any[] = [];
  newMessage = "";
  isTyping = false;
  responseContent = "";
  messageSubscription!: Subscription;
  session: string;
  private apiUrl = "http://localhost:9200/start";

  constructor(private wsService: WebSocketService, private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private getSessio() {
    this.http
      .post<{ session_id: string }>(this.apiUrl, {})
      .subscribe((response) => {
        this.session = response.session_id;
        this.initWebSocket();
      });
  }

  private initWebSocket() {
    this.wsService.connect(this.session);
    this.messageSubscription = this.wsService.messages$.subscribe(
      (msg: ChatMessage) => {
        if (msg.type === "ready") {
          this.messages.push({
            content: "Hi i am ready for you request",
            isUser: false,
            timestamp: new Date(),
          });
          this.isTyping = false;
        } else if (msg.type !== "data") {
          console.log(msg);
          this.messages.push({
            content: msg.content,
            isUser: false,
            timestamp: new Date(),
          });
          this.isTyping = false;
        } else {
          console.log(msg);
        }
      }
    );
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.isChatOpenChange.emit(this.isChatOpen);
    if (this.isChatOpen) {
      this.getSessio();
      this.isTyping = true;
    } else this.wsService.close();
  }

  sendMessage(event?: KeyboardEvent) {
    if (event) {
      if (event.shiftKey && event.key === "Enter") {
        this.newMessage += "\n";
        return;
      }
      if (!event.shiftKey && event.key === "Enter") {
        event.preventDefault();
      }
    }

    if (this.newMessage.trim()) {
      this.messages.push({
        content: this.newMessage,
        isUser: true,
        timestamp: new Date(),
      });
      console.log(this.newMessage);
      this.isTyping = true;
      this.wsService.sendMessage(this.newMessage);
      this.newMessage = "";
    }
  }

  private scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }
  }

  hidePulse() {
    this.showPulse = false;
  }
}
