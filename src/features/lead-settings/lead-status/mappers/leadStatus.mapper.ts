import type { LeadStatusItem, LeadStatusApiItem } from '../types';

export function mapApiToUI(item: LeadStatusApiItem): LeadStatusItem {
  return {
    id: item.statusId,
    status: item.status,
    color: item.color,
    useForConversion: item.conversion,
  };
}
