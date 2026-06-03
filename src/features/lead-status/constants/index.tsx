import type { FormField } from '../../../shared/types/crud';
import type { Column } from '../../../shared/types/crud';
import type { LeadStatusItem } from '../types';

export const formFields: FormField[] = [
  { name: 'status', label: 'Status', type: 'text', required: true, placeholder: 'Enter status name' },
  { name: 'color', label: 'Color', type: 'color' },
  { name: 'useForConversion', label: 'Use for Conversion Metrics', type: 'switch' },
];

export const columns: Column<LeadStatusItem>[] = [
  { key: 'status', label: 'Status' },
  { key: 'color', label: 'Color', render: (item) => <span className="color-pill" style={{ background: item.color }} /> },
  { key: 'useForConversion', label: 'Use for Conversion Metrics', render: (item) => (
    <span className={`badge ${item.useForConversion ? 'badge-success' : 'badge-secondary'}`}>
      {item.useForConversion ? 'Yes' : 'No'}
    </span>
  )},
];

export const INIT_DATA: LeadStatusItem[] = [
  { id: 1, status: 'New', color: '#22c55e', useForConversion: false },
  { id: 2, status: 'Connected', color: '#3b82f6', useForConversion: false },
  { id: 3, status: 'Interested', color: '#f59e0b', useForConversion: true },
];
