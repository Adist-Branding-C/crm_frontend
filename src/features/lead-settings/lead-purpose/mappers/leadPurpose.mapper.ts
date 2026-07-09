import type { LeadPurposeItem, LeadPurposeApiItem } from '../types';

export function mapApiToUI(item: LeadPurposeApiItem): LeadPurposeItem {
  return {
    id: item.purposeId,
    title: item.purpose,
  };
}
