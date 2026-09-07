import type { ReactNode } from 'react';
import type { LeadAdditionalApiItem } from '../../features/lead-settings/lead-additional/types';

export interface SampleDeal {
  id: number;
  name: string;
  dealId: string;
  amount: number;
}

import type { SelectOption } from './common';

export type SampleAgent = SelectOption;

export interface SampleLead {
  id: number;
  name: string;
  phone: string;
  status?: string;
}

export interface TaskFormData {
  title: string;
  category: string;
  deal: string;
  dealId: string;
  amount: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
  assignedTo: string;
  priority: string;
  status: string;
}

export interface CampaignFormData {
  name: string;
  type: string;
  selectedLeads: SampleLead[];
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface DealFormData {
  dealName: string;
  lead: string;
  leadId?: string | number;
  mobile: string;
  mobileCountryCode?: string;
  mobileNumber?: string;
  amount: string;
  status: string;
  statusId?: string | number;
  // Deal Pipeline Redesign (Phase 5): pipelineId/stageId replace status/
  // statusId going forward - status/statusId are kept only for the read-only
  // table/column display code that hasn't been migrated yet, not written by
  // the form anymore.
  pipelineId?: string | number;
  stageId?: string | number;
  priority?: string;
  // Required only when stageId's outcome is LOST - enforced server-side
  // (see deals.service.ts's LOST_REASON_REQUIRED guard), not by this form's
  // Yup schema, since Yup has no visibility into the selected stage's outcome.
  lostReason?: string;
  // `type` is now a fixed Existing/New select (was a dynamic dropdown bound
  // to typeId) - typeId is dropped from the form entirely.
  type: string;
  startDate: string;
  endDate: string;
  closeDate?: string;
  assignAgent: string;
  agentId?: string | number;
}

export interface AddDealTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  task?: TaskFormData | null;
  draftId?: string;
}

export interface AddCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  campaign?: CampaignFormData | null;
}

export interface AddDealDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DealFormData) => void;
  deal?: DealFormData | null;
  draftId?: string;
}

import type { Lead } from '../../features/enquiries/types';

export interface AddLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (action: 'created' | 'updated') => void;
  lead?: Lead | null;
  draftId?: string;
}

export interface AddLeadFormValues {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  agentId: string;
  purposeId: string;
  typeId: string;
  statusId: string;
  sourceId: string;
  nextFollowUp: string;
  notes: string;
  location: string;
  address: string;
}

export interface DynamicAdditionalFieldsProps {
  fields: LeadAdditionalApiItem[];
  values: Record<string, unknown>;
  errors: Record<string, unknown>;
  touched: Record<string, unknown>;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  setFieldValue?: (field: string, value: unknown) => void;
}

export interface ActivityLogItem {
  id: string;
  actorName: string;
  description: string;
  createdAt: string;
}

import type { DealItem } from '../../features/deal/types/interface';

export interface DealDetailDrawerProps {
  deal: DealItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDealUpdated?: () => void;
  onDeleteDeal?: (deal: DealItem) => void;
}

export interface LeadDetailDrawerProps {
  lead: {
    id: number;
    leadId?: string;
    name: string;
    phone: string;
    email?: string;
    location?: string;
    address?: string;
    assignedTo: string;
    createdByName?: string;
    purpose: string;
    type: string;
    status: string;
    source: string;
    createdAt: string;
    updatedAt: string;
    nextFollowUp?: string;
    additionalFields?: Array<{ fieldId: string; name: string; value: string }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdated?: () => void;
  onDeleteLead?: (lead: Lead) => void;
}
