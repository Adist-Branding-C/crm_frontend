export interface CreateWorkflowPayload {
  name: string;
}

export interface TaskStageFormData {
  name: string;
  color: string;
}

export interface UpdateStagePayload {
  name: string;
  color: string;
  sortOrder: number;
}
