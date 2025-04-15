import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

import { FormFieldDto } from "src/app/core/models";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { ChatService } from "src/app/core/services/chat.service";

@Component({
  selector: "app-db-agent",
  templateUrl: "./db-agent.component.html",
  styleUrls: ["../../chat/chat.component.scss",'./db-agent.component.scss'],
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
  messages: any[] = [
    {
      content: "Hello! Im here to help with form creation. Ask me anything!",
      isUser: false,
      timestamp: new Date(),
    },
  ];
  newMessage = "";
  isTyping = false;
  responseContent = "";

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.isChatOpenChange.emit(this.isChatOpen);
  }

  sendMessage(event?: KeyboardEvent) {}

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
