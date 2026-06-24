import type { LeadTypeItem, LeadTypeApiItem } from '../types';

export function mapApiToUI(item: LeadTypeApiItem): LeadTypeItem {
  return {
    id: item.typeId,
    addedBy: item.createdBy,
    type: item.type,
  };
}
