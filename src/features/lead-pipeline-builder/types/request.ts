export interface CreatePipelinePayload {
  name: string;
  isDefault?: boolean;
}

export interface LeadStageFormData {
  status: string;
  color: string;
  conversion: boolean;
}

export interface UpdateStagePositionPayload {
  positionX: number;
  positionY: number;
}

export interface CreateTransitionPayload {
  fromStatusId?: string;
  toStatusId: string;
}
