import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { RefObject } from 'react';
import type { Campaign, CampaignFormData, Agent } from './interface';
import type { CampaignFilters } from './hook';

export interface CampaignActionsProps {
  campaign: Campaign;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export interface CampaignRowProps {
  campaign: Campaign;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export interface CampaignFormProps {
  editingItem: Campaign | null;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignFormData;
  onSubmit: (values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  onCancel: () => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export interface DeleteCampaignDialogProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
  error?: string | null;
}

export interface AgentMultiSelectProps {
  agents: Agent[];
  selected: string[];
  onChange: (selected: string[]) => void;
  isLoading?: boolean;
  error?: boolean;
  labelledBy?: string;
}

export interface CampaignFiltersProps {
  filters: CampaignFilters;
  onFilterChange: (patch: Partial<CampaignFilters>) => void;
  onClearFilters: () => void;
  onClose: () => void;
  agentOptions: Agent[];
  agentOptionsLoading: boolean;
}
