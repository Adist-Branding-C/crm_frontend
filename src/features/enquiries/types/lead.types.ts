export interface LeadType {
  id: string;
  type: string;
  typeId: string;
  companyId: string;
  status: string;
  isDefault: boolean;
}

export interface LeadStatus {
  id: string;
  status: string;
  statusId: string;
  color: string;
  companyId: string;
  conversion: boolean;
  isDefault: boolean;
}

export interface LeadSource {
  id: string;
  source: string;
  sourceId: string;
  companyId: string;
  status: string;
}

export interface LeadPurpose {
  id: string;
  purpose: string;
  purposeId: string;
  companyId: string;
}

export interface Lead {
  id: string;
  typeId: string;
  statusId: string;
  sourceId: string;
  purposeId: string;
  name: string;
  phone: string;
  location: string;
  address: string;
  agentId: string;
  companyId: string;
  nextFollowUpDate: string | null;
  remark: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  type: LeadType | null;
  status: LeadStatus | null;
  source: LeadSource | null;
  purpose: LeadPurpose | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface GetLeadsResponseData {
  items: Lead[];
  pagination: PaginationMeta;
  statistics: Record<string, unknown>;
}

export interface GetLeadsResponse {
  status: boolean;
  message: string;
  data: GetLeadsResponseData;
}

export interface GetSingleLeadResponse {
  status: boolean;
  message: string;
  data: Lead;
}

export interface CreateLeadResponse {
  status: boolean;
  message: string;
  data: { leadId: string };
}

export interface UpdateLeadResponse {
  status: boolean;
  message: string;
  data: { leadId: string };
}

export interface DeleteLeadResponse {
  status: boolean;
  message: string;
  data: { leadId: string };
}

export interface GetLeadsQuery {
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  dateFrom?: string;
  dateTo?: string;
  dateFilterBy?: string;
  sourceId?: string;
  purposeId?: string;
  statusId?: string;
  followUpAdded?: string;
  createdBy?: string;
  assignedTo?: string;
  typeId?: string;
  location?: string;
  remark?: string;
  type?: string;
  date?: string;
  [key: string]: unknown;
}
