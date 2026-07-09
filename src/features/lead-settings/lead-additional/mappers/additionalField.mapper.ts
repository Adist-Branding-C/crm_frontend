import type { LeadPurposeApiItem } from '../../lead-purpose/types/interface';
import type { LeadAdditionalItem, LeadAdditionalApiItem, LeadPurposeOption, AdditionalFieldFormData } from '../types/interface';

export function mapApiToUI(item: LeadAdditionalApiItem): LeadAdditionalItem {
  return {
    id: item.fieldId,
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
  return { id: item.purpose_id, title: item.purpose };
}

export function mapItemToFormData(item: LeadAdditionalItem): AdditionalFieldFormData {
  return {
    name: item.field,
    fieldType: item.type.toLowerCase(),
    showInFilter: item.inFilter,
    showInList: item.inList,
    isRequired: item.required,
    connectWithLeadPurpose: item.purpose,
    purposeId: item.purposeId || '',
    dropdownValues: item.dropdownValues ? [...item.dropdownValues] : [],
  };
}
