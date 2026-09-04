export interface FieldOption {
  key: string;
  label: string;
}

/**
 * Standard (non-additional) lead fields exportable from the Lead Export page.
 * Keys mirror the lead entity's real exportable fields on the backend.
 */
export const STANDARD_EXPORT_FIELDS: FieldOption[] = [
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'location', label: 'Location' },
  { key: 'address', label: 'Address' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'source', label: 'Source' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'agentId', label: 'Assigned To' },
  { key: 'nextFollowUpDate', label: 'Next Follow Up' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
];
