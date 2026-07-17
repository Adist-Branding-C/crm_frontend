export interface CallReasonItem {
  id: number;
  name: string;
  status?: string;
}

export interface CallReason {
  id: number;
  name: string;
  status: string;
}

export interface ParsedApiError {
  message: string;
  errors?: Record<string, string[]>;
  field?: string;
}
