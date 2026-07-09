import type { LeadAdditionalItem, LeadAdditionalApiItem, LeadPurposeOption } from '../types';

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

export function mapPurposeApiToUI(item: { purposeId: string; purpose: string }): LeadPurposeOption {
  return { id: item.purposeId, title: item.purpose };
}
