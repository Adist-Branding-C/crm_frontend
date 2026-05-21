export interface Agent {
  id: number;
  name: string;
}

export interface DealType {
  id: number;
  name: string;
}

export interface Stage {
  id: number;
  name: string;
  color: string;
}

export interface Deal {
  id: number;
  title: string;
  value: number;
  stage: number;
  contact: string;
  company: string;
  probability: number;
  nextAction: string;
  dueDate: string;
}
