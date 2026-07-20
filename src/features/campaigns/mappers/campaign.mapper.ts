import { CAMPAIGN_TYPES, ADD_CAMPAIGN_INITIAL_VALUES } from '../constants';
import { computeSlNo } from '../utils/campaign.utils';
import type { Campaign } from '../types/interface';
import type { CampaignFormData, CreateCampaignPayload, UpdateCampaignPayload } from '../types/request';

/**
 * Explicit shape transformations between the Campaign API/entity form and the
 * campaign form's local representation.
 *
 * Used by:
 * - useFetchCampaigns (API list response -> Campaign entities with computed slNo)
 * - useCampaignSubmitHandlers (CampaignFormData -> create/update request payload)
 * - CampaignsPage (Campaign entity -> edit-drawer initial form values)
 *
 * Notes:
 * - Kept entity-specific rather than folded into a generic mapper because every
 *   method here has real business logic (page-relative row numbering, the
 *   Lead Campaign/Data Pool payload split, edit-form defaulting).
 */
export class CampaignMapper {
  static toEntityList(items: Campaign[], pageNumber: number, limit: number): Campaign[] {
    return items.map((item, index) => ({
      ...item,
      slNo: computeSlNo(index, pageNumber, limit),
    }));
  }

  static toRequest(formData: CampaignFormData): CreateCampaignPayload | UpdateCampaignPayload {
    if (formData.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN) {
      return {
        type: CAMPAIGN_TYPES.LEAD_CAMPAIGN,
        name: formData.name,
        ...(formData.description ? { description: formData.description } : {}),
        ...(formData.startDate ? { startDate: formData.startDate } : {}),
        ...(formData.endDate ? { endDate: formData.endDate } : {}),
        ...(formData.agents.length > 0 ? { agents: formData.agents } : {}),
      };
    }
    return {
      type: CAMPAIGN_TYPES.DATA_POOL,
      poolName: formData.poolName,
      poolAgents: formData.poolAgents,
    };
  }

  static toFormValues(item: Campaign | null): CampaignFormData {
    if (!item) return ADD_CAMPAIGN_INITIAL_VALUES;
    return {
      type: item.type || '',
      name: item.name || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      description: item.description || '',
      poolName: item.poolName || (item.type === CAMPAIGN_TYPES.DATA_POOL ? item.name : '') || '',
      poolAgents: (item.poolAgents || []).map((agent) => agent.agentId || String(agent.id)),
      agents: (item.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN ? item.agents : []) || [],
    };
  }
}
