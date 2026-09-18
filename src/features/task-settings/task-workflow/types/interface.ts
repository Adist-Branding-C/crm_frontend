export interface TaskWorkflowStage {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  positionX?: number | null;
  positionY?: number | null;
}

export interface TaskWorkflowItem {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  stages: TaskWorkflowStage[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface TaskWorkflowDetail extends TaskWorkflowItem {
  stages: TaskWorkflowStage[];
}
