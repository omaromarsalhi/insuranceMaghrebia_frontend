import { Component, Input, OnInit } from "@angular/core";
import { AnswersTypeDto, OfferResponse } from "src/app/core/models";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.scss"],
  animations: [
    trigger('accordionAnimation', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class OfferDetailComponent implements OnInit {
  @Input() offer: OfferResponse;

  activeAccordionIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  getAnswersForQuestion(
    answers: AnswersTypeDto[],
    questionIndex: number
  ): AnswersTypeDto[] {
    return answers.filter((a) => a.questionIndex === questionIndex);
  }

  toggleAccordion(index: number) {
    this.activeAccordionIndex =
      this.activeAccordionIndex === index ? null : index;
  }

  isAccordionOpen(index: number): boolean {
    return this.activeAccordionIndex === index;
  }
}
