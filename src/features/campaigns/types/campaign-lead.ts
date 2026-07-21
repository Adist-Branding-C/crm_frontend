import type { CampaignLeadStatus } from '../../../shared/constants/enums';

export interface CampaignLeadItem {
  id: number;
  campaignId: number;
  leadId: number;
  status: CampaignLeadStatus;
  createdAt: string;
  lead?: {
    id: number;
    leadId: string;
    name: string;
    phone: string;
    email: string | null;
    location: string | null;
  } | null;
}

export interface AssignLeadsResult {
  items: CampaignLeadItem[];
  newlyAssignedCount: number;
  alreadyAssignedCount: number;
}
