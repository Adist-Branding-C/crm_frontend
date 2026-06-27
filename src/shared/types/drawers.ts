import type { ReactNode } from 'react';

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
  mobile: string;
  amount: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  assignAgent: string;
}

export interface AddDealTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  task?: TaskFormData | null;
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
}

export interface AddLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}
