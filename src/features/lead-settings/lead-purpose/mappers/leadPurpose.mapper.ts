import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
import type { LeadPurposeItem, LeadPurposeApiItem, LeadPurposeFormData } from '../types/interface';

export function mapApiToUI(item: LeadPurposeApiItem): LeadPurposeItem {
  return {
    id: item.purposeId,
    addedBy: formatAddedBy(item.createdByName, item.createdByType),
    title: item.purpose,
  };
}

export function mapItemToFormData(item: LeadPurposeItem): LeadPurposeFormData {
  return { title: item.title };
}
