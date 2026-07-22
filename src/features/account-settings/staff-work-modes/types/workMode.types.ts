export interface WorkModeItem {
  id: number;
  workModeName?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface WorkModeFormData {
  workModeName: string;
  description: string;
  status: string;
}

export interface WorkModeResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DeleteWorkModeResponse {
  status: boolean;
  message: string;
}
