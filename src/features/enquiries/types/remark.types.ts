export interface Remark {
  id: number;
  remarkId: string;
  agentId: string;
  agentName: string | null;
  remarkNote: string;
  createdAt: string;
  referenceId: number;
  entityType: string;
}

export interface RemarkListResponse {
  status: boolean;
  message: string;
  data: {
    items: Remark[];
    pagination: Record<string, unknown>;
  };
}

export interface CreateRemarkPayload {
  referenceId: number | string;
  entityType: string;
  remark: string;
}

export interface UpdateRemarkPayload {
  remark: string;
}

export interface RemarkApiResponse {
  status: boolean;
  message: string;
}
