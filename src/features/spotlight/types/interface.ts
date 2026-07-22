import type { DateRange, LabelValuePair } from '../../../shared/types/common';

export interface SpotlightLead {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
}

export interface SpotlightLeadApi {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  notes: string;
  typeId: number;
  statusId: number;
  sourceId: number;
  purposeId: number;
  agentId: string;
  companyId: string;
  nextFollowUpDate: string | null;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdByType: string | null;
  updatedBy: string | null;
  updatedByType: string | null;
  deletedBy: string | null;
  status: string | null;
  type: string | null;
  source: string | null;
  purpose: string | null;
  agentName: string | null;
}

export interface SpotlightFilters {
  dateRange: DateRange;
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatusId: string;
  assignedTo: string;
  leadTypeId: string;
  location: string;
  remarks: string;
}

export interface SpotlightFilterOptions {
  leadTypes: LabelValuePair[];
  sources: LabelValuePair[];
  purposes: LabelValuePair[];
  statuses: LabelValuePair[];
  agents: LabelValuePair[];
}
