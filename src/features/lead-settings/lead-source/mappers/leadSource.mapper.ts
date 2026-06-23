import type { LeadSourceItem, LeadSourceApiItem } from '../types';

export function mapApiToUI(item: LeadSourceApiItem): LeadSourceItem {
  return {
    id: item.sourceId,
    source: item.source,
    addedBy: item.createdBy,
  };
}
