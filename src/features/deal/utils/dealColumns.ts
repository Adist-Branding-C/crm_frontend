import type { DealItem } from '../types/interface';

export function getDealColumns(deals: DealItem[]): Array<{ key: string; label: string; sortable?: boolean }> {
  const baseColumns = [
    { key: 'action', label: 'Action' },
    { key: 'dealName', label: 'Deal Name', sortable: true },
    { key: 'lead', label: 'Lead', sortable: true },
    { key: 'mobile', label: 'Phone', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date', sortable: true },
    { key: 'agent', label: 'Agent', sortable: true },
    { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created At', sortable: true },
  ];

  const additionalFieldNames = new Set<string>();
  for (const row of deals) {
    for (const af of row.additionalFields || []) {
      additionalFieldNames.add(af.name);
    }
  }

  const additionalColumns = [...additionalFieldNames].map(name => ({
    key: `additional_${name}`,
    label: name,
  }));

  return [...baseColumns, ...additionalColumns];
}
