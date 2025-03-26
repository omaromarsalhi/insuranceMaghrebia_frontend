import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from "@angular/core";
import { ChatService } from "./chat.service";
import { FormFieldDto } from "src/app/core/models";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  animations: [
    trigger('pulse', [
      state('normal', style({ 
        transform: 'scale(1)',
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
      })),
      state('hover', style({ 
        transform: 'scale(1.1)',
        boxShadow: '0 6px 16px rgba(0, 123, 255, 0.4)'
      })),
      transition('normal => hover', animate('200ms ease-out')),
      transition('hover => normal', animate('150ms ease-in')),
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.8, 1)',
          style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChatComponent implements AfterViewChecked {
  @Input() isChatOpen!: boolean;
  @Output() isChatOpenChange = new EventEmitter<boolean>();
  @Output() aiResponse = new EventEmitter<FormFieldDto[]>();
  @ViewChild("messageContainer") private messageContainer!: ElementRef;
  buttonState: 'normal' | 'hover' = 'normal';
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
  // userInput: string = '';
  // chatHistory: { user: string, assistant: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.isChatOpenChange.emit(this.isChatOpen);
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
      // Add user message

      this.messages.push({
        content: this.newMessage.trim(),
        isUser: true,
        timestamp: new Date(),
      });

      this.isTyping = true;
      this.chatService.chat(this.newMessage).subscribe(
        (response: any) => {
          console.log(response);
          if (
            response.type === "text" &&
            response.responseText.toLowerCase() === "goodbye!"
          ){
            response.responseText="Goodbye 👋"
            setTimeout(() => {
              this.toggleChat();
            }, 800);}

          this.responseContent =
            response.type === "json" ? "Done 😊" : response.responseText;
          this.messages.push({
            content: this.responseContent,
            isUser: false,
            timestamp: new Date(),
          });
          this.isTyping = false;
          if (response.type === "json")
            this.aiResponse.emit(response.responseText);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
      this.newMessage = "";
    }
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop =
      this.messageContainer.nativeElement.scrollHeight;
  }

  hidePulse() {
    this.showPulse = false;
  }


}
