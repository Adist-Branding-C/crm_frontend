import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
import type { LeadSourceItem, LeadSourceApiItem, LeadSourceFormData } from '../types/interface';

export function mapApiToUI(item: LeadSourceApiItem): LeadSourceItem {
  return {
    id: item.sourceId,
    source: item.source,
    addedBy: formatAddedBy(item.createdByName, item.createdByType),
  };
}

export function mapItemToFormData(item: LeadSourceItem): LeadSourceFormData {
  return { source: item.source };
}
