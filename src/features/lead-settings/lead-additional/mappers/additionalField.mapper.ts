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

export function mapPurposeApiToUI(item: { purpose_id: string; purpose: string }): LeadPurposeOption {
  return { id: item.purpose_id, title: item.purpose };
}
