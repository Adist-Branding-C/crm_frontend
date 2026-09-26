export interface CreateWorkflowPayload {
  name: string;
}

export interface TaskStageFormData {
  name: string;
  color: string;
  isCompletedStage: boolean;
}

export interface UpdateStagePayload {
  name: string;
  color: string;
  isCompletedStage: boolean;
  sortOrder: number;
}
