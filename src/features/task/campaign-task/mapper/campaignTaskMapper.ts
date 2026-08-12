import { toIdString, toHHmm } from '../../common/utils/taskFieldTransforms';
import type { CampaignTaskFormData, CampaignTaskItem } from '../types/index';

/**
 * Maps a CampaignTaskItem (API entity shape) to CampaignTaskFormData (drawer form shape).
 *
 * Used by:
 * - useCampaignTaskDrawer, to derive the Edit drawer's initial values from the editing item.
 * - useCampaignTaskFormSubmit, to detect a no-op edit submit (compares this against the
 *   submitted form values).
 */
export class CampaignTaskMapper {
  static toFormValues(item: CampaignTaskItem): CampaignTaskFormData {
    return {
      title: item.title || '',
      description: item.description || '',
      scheduledDate: item.scheduledDate || '',
      scheduledTime: toHHmm(item.scheduledTime),
      assignedTo: toIdString(item.assignedTo),
      campaignId: toIdString(item.leadId),
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
