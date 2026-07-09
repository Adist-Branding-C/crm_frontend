import type { LeadPurposeItem, LeadPurposeApiItem, LeadPurposeFormData } from '../types/interface';

export function mapApiToUI(item: LeadPurposeApiItem): LeadPurposeItem {
  return {
    id: item.purpose_id,
    title: item.purpose,
  };
}

export function mapItemToFormData(item: LeadPurposeItem): LeadPurposeFormData {
  return { title: item.title };
}
