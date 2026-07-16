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
      scheduledTime: item.scheduledTime || '',
      assignedTo: item.assignedTo ? String(item.assignedTo.id) : '',
      leadId: item.leadId ? String(item.leadId.id) : '',
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
