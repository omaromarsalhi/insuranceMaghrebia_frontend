import { Component, OnInit,AfterViewChecked,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './websocket.service';
import { Subscription } from 'rxjs';



interface ChatMessage {
  type: string;
  content: string;
  timestamp?: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnDestroy {
  

  message = '';
  messages: ChatMessage[] = [];
  private messageSubscription: Subscription;

  constructor(private wsService: WebSocketService) {
    this.messageSubscription = this.wsService.messages$.subscribe(
      (msg: ChatMessage) => {
        this.messages.push(msg);
      }
    );
  }

  sendMessage() {
    if (this.message.trim()) {
      // this.wsService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  getLabel(type: string): string {
    switch(type) {
      case 'user': return 'You';
      case 'ai': return 'AI';
      case 'system': return 'System';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  }

}
