export interface OfferData {
    offerName: string;
    offerHeader: string;
    category: FilteredCategory;
    imageUri?: string;
    labels?: OfferLabel[];
  }
  
  export interface FilteredCategory {
    id: number;
    name: string;
  }
  
  export interface OfferLabel {
    name: string;
    questions: string[];
    answers: AnswersType[];
  }
  
  export interface AnswersType {
      questionIndex: number;
      value: string;
    }
  