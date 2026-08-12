export interface UpdateLeadPayload {
  name?: string;
  phone?: string;
  countryCode?: string;
  email?: string;
  agentId?: string;
  purposeId?: string;
  typeId?: string;
  statusId?: string;
  sourceId?: string;
  nextFollowUp?: string | null;
  notes?: string;
  location?: string;
  address?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}

export interface CreateLeadPayload {
  name: string;
  phone: string;
  countryCode: string;
  email?: string;
  sourceId: string;
  agentId?: string;
  purposeId?: string;
  typeId?: string;
  statusId?: string;
  nextFollowUp?: string | null;
  notes?: string;
  location?: string;
  address?: string;
  additionalFields?: Array<{ fieldId: string; value: string }>;
}

export interface GetLeadsParams {
  pageNumber: number;
  limit: number;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  typeId?: string;
  statusId?: string;
  sourceId?: string;
  purposeId?: string;
  assignedTo?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  dateFilterBy?: string;
  followUpAdded?: string;
  additionalFieldFilters?: string;
}

export interface CreateRemarkPayload {
  referenceId: number | string;
  entityType: string;
  remark: string;
}

export interface UpdateRemarkPayload {
  remark: string;
}

export interface LeadTaskFormData {
  title: string;
  description: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
}
