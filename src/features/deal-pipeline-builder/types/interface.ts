export type DealOutcome = 'OPEN' | 'WON' | 'LOST';

export interface DealPipelineItem {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DealStageItem {
  id: string;
  name: string;
  probability: number;
  outcome: DealOutcome;
  color: string | null;
  sortOrder: number;
  status: boolean;
  pipelineId: number;
  positionX: number | null;
  positionY: number | null;
}

export interface DealStageTransitionItem {
  id: string;
  fromStageId: number | null;
  toStageId: number;
}

export interface DealPipelineDetail extends DealPipelineItem {
  stages: DealStageItem[];
  transitions: DealStageTransitionItem[];
}
