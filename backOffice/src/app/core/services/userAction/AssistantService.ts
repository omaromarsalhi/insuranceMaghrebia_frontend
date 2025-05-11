
import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class AssistantService {
    private socket = webSocket('ws://localhost:8000/ws/assistant');

    sendUserInput(userInput: string): void {
        this.socket.next({ user_input: userInput });
        console.log(userInput);
    }

    getMessages() {
        return this.socket.asObservable();
    }
}
