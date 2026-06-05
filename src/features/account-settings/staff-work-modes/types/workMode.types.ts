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

export interface WorkModeResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T | undefined;
}
