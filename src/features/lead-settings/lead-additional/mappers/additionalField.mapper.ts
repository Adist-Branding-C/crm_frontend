import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
import type { LeadPurposeApiItem } from '../../lead-purpose/types/interface';
import type { LeadAdditionalItem, LeadAdditionalApiItem, LeadPurposeOption, AdditionalFieldFormData } from '../types/interface';

export function mapApiToUI(item: LeadAdditionalApiItem): LeadAdditionalItem {
  return {
    id: item.fieldId,
    addedBy: formatAddedBy(item.createdByName, item.createdByType),
    field: item.name,
    fieldKey: item.fieldKey,
    type: item.fieldType,
    inFilter: item.showInFilter,
    inList: item.showInList,
    required: item.isRequired,
    purpose: item.connectWithLeadPurpose,
    purposeName: item.purpose ?? '',
    purposeId: item.purposeId,
    dropdownValues: item.values || [],
  };
}

export function mapPurposeApiToUI(item: LeadPurposeApiItem): LeadPurposeOption {
  return { id: item.purposeId, title: item.purpose };
}

export function mapItemToFormData(item: LeadAdditionalItem): AdditionalFieldFormData {
  return {
    name: item.field,
    fieldType: item.type,
    showInFilter: item.inFilter,
    showInList: item.inList,
    isRequired: item.required,
    connectWithLeadPurpose: item.purpose,
    purposeId: item.purposeId || '',
    dropdownValues: item.dropdownValues ? [...item.dropdownValues] : [],
  };
}
