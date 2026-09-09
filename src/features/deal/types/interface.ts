export interface DealItem {
  id: number;
  dealId?: string;
  dealName?: string;
  title?: string;
  lead?: string;
  leadId?: string | number;
  mobile?: string;
  amount?: number;
  currency?: string;
  status?: string;
  statusId?: string | number;
  pipelineId?: string | number;
  stageId?: string | number;
  type?: string;
  stage?: string;
  priority?: string;
  lostReason?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  closeDate?: string;
  agent?: string;
  agentId?: string | number;
  createdBy?: string;
  createdAt?: string;
  additionalFields?: { fieldId: string; name: string; value: string }[];
}

export interface DealFormData {
  dealName: string;
  lead: string;
  leadId?: string | number;
  mobile: string;
  amount: string;
  status: string;
  statusId?: string | number;
  pipelineId?: string | number;
  stageId?: string | number;
  type: string;
  stage: string;
  priority: string;
  lostReason?: string;
  assignedTo: string;
  agentId?: string | number;
  startDate: string;
  endDate: string;
  closeDate?: string;
  notes: string;
  additionalFields?: { fieldId: string; value: string }[];
}

export interface DealAdditionalField {
  fieldId: string;
  name: string;
  value: string;
}

export interface DealStage {
  id: string;
  name: string;
  label: string;
}

export interface DealStatusFilters {
  dateRange: { start: string; end: string };
  filterByDate: string;
  status: string;
  type: string;
  assignedTo: string;
  additionalFields: Record<string, string>;
}

export interface DealAdditionalFieldDef {
  fieldId: string;
  fieldName: string;
  fieldKey: string;
  fieldType: string;
  isRequired: boolean;
  showInList: boolean;
  showInFilter: boolean;
  values: string[];
}

export interface LeadOption {
  label: string;
  value: string | number;
}

export interface StaffOption {
  label: string;
  value: string | number;
}

export interface DealListResponse {
  items: DealItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

