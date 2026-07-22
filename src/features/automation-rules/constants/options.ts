import type { SelectOption } from '../types';

// Real staff/department/campaign/status/source/purpose lists now come from
// useAutomationLookupOptions (via AutomationDataContext) — these used to be hardcoded
// mock arrays (staff-11, dept-sales-north, camp-101...) that didn't correspond to
// anything in the database, so a rule saved through the UI would submit ids the real
// backend either rejects or can't resolve.

export const VALUE_CHANGE_FIELD_OPTIONS: SelectOption[] = [
  { value: 'statusId', label: 'Status' },
  { value: 'purposeId', label: 'Purpose' },
  { value: 'typeId', label: 'Type' },
  { value: 'sourceId', label: 'Source' },
  { value: 'agentId', label: 'Agent' },
  { value: 'nextFollowUpDate', label: 'Next Follow-up Date' },
];

export function optionLabel(options: SelectOption[], value: string | undefined): string {
  if (!value) return '-';
  return options.find((option) => option.value === value)?.label ?? value;
}
