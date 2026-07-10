import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
import type { LeadStatusItem, LeadStatusApiItem, LeadStatusFormData } from '../types/interface';

export function mapApiToUI(item: LeadStatusApiItem): LeadStatusItem {
  return {
    id: item.statusId,
    addedBy: formatAddedBy(item.createdByName, item.createdByType),
    status: item.status,
    color: item.color,
    useForConversion: item.conversion,
  };
}

export function mapItemToFormData(item: LeadStatusItem): LeadStatusFormData {
  return {
    status: item.status,
    color: item.color,
    useForConversion: item.useForConversion,
  };
}
