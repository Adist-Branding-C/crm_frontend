import type { CampaignMode, CampaignFormData, Agent } from './campaign.types';

export interface CampaignFormProps {
  mode: CampaignMode;
  formData: CampaignFormData;
  errors: Record<string, string>;
  agents: Agent[];
  isLoadingAgents: boolean;
  onFieldChange: (name: string, value: string) => void;
  onAgentChange: (selected: string[]) => void;
  onTypeChange: (type: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
