import type { FormField } from '../../../../shared/types/crud';
import type { Column } from '../../../../shared/types/crud';
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
