import type { DealOutcome } from './interface';

export interface CreatePipelinePayload {
  name: string;
  isDefault?: boolean;
}

export interface DealStageFormData {
  name: string;
  probability: number;
  outcome: DealOutcome;
  color: string;
}

export interface UpdateStagePositionPayload {
  positionX: number;
  positionY: number;
}

export interface CreateTransitionPayload {
  fromStageId?: number;
  toStageId: number;
}
