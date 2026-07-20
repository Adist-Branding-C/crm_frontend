import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { RefObject } from 'react';
import type { Campaign, Agent } from './interface';
import type { CampaignFormData } from './request';

export interface CampaignActionsProps {
  campaign: Campaign;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onAssign: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export interface CampaignRowProps {
  campaign: Campaign;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onAssign: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export interface CampaignFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignFormData;
  onSubmit: (values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}

export interface AgentMultiSelectProps {
  agents: Agent[];
  selected: string[];
  onChange: (selected: string[]) => void;
  isLoading?: boolean;
  error?: boolean;
}
