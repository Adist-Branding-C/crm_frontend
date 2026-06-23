import type { Campaign } from './campaign.types';
import type { CreateCampaignPayload } from './campaign.types';
import type { GetCampaignsParams } from './campaign.types';

export interface UseCampaignActionsParams {
  campaign: {
    setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
    campaigns: Campaign[];
    fetchCampaigns: (params: GetCampaignsParams) => Promise<void>;
  };
  drawer: {
    mode: 'add' | 'edit';
    editingCampaign: Campaign | null;
    close: () => void;
    validate: () => boolean;
    buildPayload: () => CreateCampaignPayload;
  };
  filters: {
    actionMenuOpen: number | null;
    setActionMenuOpen: (id: number | null) => void;
  };
  buildParams: () => GetCampaignsParams;
}
