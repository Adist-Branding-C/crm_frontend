export interface LeadPipelineItem {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface LeadStageItem {
  id: string;
  status: string;
  color: string;
  conversion: boolean;
  sortOrder: number;
  pipelineId: number;
  positionX: number | null;
  positionY: number | null;
}

export interface LeadStageTransitionItem {
  id: string;
  fromStageId: string | null;
  toStageId: string;
}

export interface LeadPipelineDetail extends LeadPipelineItem {
  stages: LeadStageItem[];
  transitions: LeadStageTransitionItem[];
}
