import type { LeadTypeItem, LeadTypeApiItem, LeadTypeFormData } from '../types/interface';

export function mapApiToUI(item: LeadTypeApiItem): LeadTypeItem {
  return {
    id: item.typeId,
    addedBy: item.createdBy,
    type: item.type,
  };
}

export function mapItemToFormData(item: LeadTypeItem): LeadTypeFormData {
  return { type: item.type };
}
