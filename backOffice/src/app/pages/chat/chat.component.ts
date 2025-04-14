import { Component, OnInit } from '@angular/core';
import { AssistantService } from '../../core/services/AssistantService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  // Pour saisir une commande générale
  userInput = '';
  // Pour saisir la réponse à un prompt en attente
  promptResponse = '';
  // Contient le texte du prompt envoyé par le serveur
  pendingPrompt: string | null = null;
  // Historique des messages
  messages: any[] = [];

  constructor(private assistantService: AssistantService) {}

  ngOnInit() {
    this.assistantService.getMessages().subscribe((msg: any) => {
      console.log(msg);
      // Ajout du message dans l'historique
      this.messages.push(msg);
      // Si le message contient un prompt, le stocker dans pendingPrompt
      if (msg.prompt) {
        this.pendingPrompt = msg.prompt;
      }
    });
  }

  send() {
    // Si une réponse à une invite est en attente, on envoie la réponse
    if (this.pendingPrompt) {
      this.assistantService.sendUserInput(JSON.stringify({ value: this.promptResponse }));
      // Réinitialisation de l'état du prompt
      this.pendingPrompt = null;
      this.promptResponse = '';
    } else {
      // Sinon, envoi de la commande générale
      this.assistantService.sendUserInput(this.userInput);
      this.userInput = '';
    }
  }
}
