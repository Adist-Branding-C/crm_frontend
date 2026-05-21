export interface FacebookLead {
  id: number;
  workflowName: string;
  name: string;
  phone: string;
  additionalData: {
    city: string;
    course: string;
    email: string;
    campaign: string;
  };
  status: string;
  leadStatus: string;
  createdAt: string;
  failureReason: string;
}

export interface Workflow {
  id: number;
  name: string;
}

export interface Filters {
  dateFrom: string;
  dateTo: string;
  workflow: string;
  search: string;
}

export interface LeadStats {
  total: number;
  success: number;
  failed: number;
  new: number;
  duplicate: number;
  pending: number;
}
