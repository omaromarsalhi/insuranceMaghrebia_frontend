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

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements AfterViewChecked {
  @Input() isChatOpen!: boolean;
  @Output() isChatOpenChange = new EventEmitter<boolean>();
  @Output() aiResponse = new EventEmitter<FormFieldDto[]>();
  @ViewChild("messageContainer") private messageContainer!: ElementRef;
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
          )
            setTimeout(() => {
              this.toggleChat();
            }, 800);

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

  // sendMessage() {
  //   if (this.userInput.trim() === '') return;

  //   this.chatService.chat(this.userInput).subscribe(
  //     (response: any) => {
  //       this.chatHistory.push({ user: this.userInput, assistant: response.response });
  //       this.userInput = '';
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
}
