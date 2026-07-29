import type { LeadAdditionalField, Remark, ActivityItem } from './interface';

// The backend serializes these as lookup objects (TypeORM VirtualColumns joining the
// lead-settings tables), not plain strings — see Leads entity's `type`/`status`/`source`/
// `purpose` VirtualColumns in crm_backend. mapApiToUI (leadMapper.ts) unwraps these into
// the flat display-name strings the rest of the UI expects.
export interface LeadApiStatusLookup {
  statusId: string | null;
  status: string | null;
  color?: string | null;
  conversion?: boolean | null;
}

export interface LeadApiAssignedStaff {
  staff_id: string;
  name: string;
}

export interface LeadApiItem {
  id: number;
  leadId: string;
  name: string;
  phone: string;
  countryCode: string | null;
  email: string | null;
  location: string | null;
  address: string | null;
  agentId: string | null;
  assignedStaff: LeadApiAssignedStaff | null;
  purpose: { purposeId: string | null; purpose: string | null } | null;
  type: { typeId: string | null; type: string | null } | null;
  status: LeadApiStatusLookup | null;
  source: { sourceId: string | null; source: string | null } | null;
  createdAt: string | null;
  updatedAt: string | null;
  nextFollowUpDate: string | null;
  additionalFields?: LeadAdditionalField[];
  deletedAt?: string | null;
  deletedByName?: string | null;
}

export interface PaginationInfo {
  pageNumber: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadListData {
  items: LeadApiItem[];
  pagination: PaginationInfo;
}


export interface LeadSearchApiItem {
  id: string;
  name: string;
  phone: string;
  status: string | null;
  source: string | null;
}

export interface LeadSearchData {
  items: LeadSearchApiItem[];
}

export interface CreateLeadData {
  leadId: string;
}

export interface RemarkListData {
  items: Remark[];
  pagination: Record<string, unknown>;
}

export interface ActivityListData {
  items: ActivityItem[];
}
