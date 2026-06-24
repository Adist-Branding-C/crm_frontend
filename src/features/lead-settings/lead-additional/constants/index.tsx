import type { Column } from '../../../../shared/types/crud';
import type { LeadAdditionalItem } from '../types';

export const columns: Column<LeadAdditionalItem>[] = [
  { key: 'field', label: 'Field' },
  { key: 'type', label: 'Type' },
  {
    key: 'dropdownValues',
    label: 'Values',
    render: (item) => (
      <span>{item.dropdownValues.length > 0 ? item.dropdownValues.join(', ') : '-'}</span>
    ),
  },
  {
    key: 'inFilter',
    label: 'in filter',
    render: (item) => (
      <span className={`badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`}>
        {item.inFilter ? 'YES' : 'NO'}
      </span>
    ),
  },
  {
    key: 'inList',
    label: 'in list',
    render: (item) => (
      <span className={`badge ${item.inList ? 'badge-success' : 'badge-secondary'}`}>
        {item.inList ? 'YES' : 'NO'}
      </span>
    ),
  },
  {
    key: 'required',
    label: 'Required',
    render: (item) => (
      <span className={`badge ${item.required ? 'badge-success' : 'badge-secondary'}`}>
        {item.required ? 'YES' : 'NO'}
      </span>
    ),
  },
  {
    key: 'purpose',
    label: 'Purpose',
    render: (item) => <span>{item.purposeName}</span>,
  },
];
