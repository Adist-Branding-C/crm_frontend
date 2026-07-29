import type { DateRange, LabelValuePair } from '../../../shared/types/common';

export interface SpotlightLead {
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
  status: { statusId: string; status: string; color?: string; conversion?: boolean } | null;
  type: { typeId: string; type: string } | null;
  source: { sourceId: string; source: string } | null;
  purpose: { purposeId: string; purpose: string } | null;
  assignedStaff: { staff_id: string; name: string } | null;
}

export type SpotlightLeadApi = SpotlightLead;

export interface SpotlightFilters {
  dateRange: DateRange;
  filterByDate: string;
  sourceId: string;
  purposeId: string;
  statusId: string;
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
