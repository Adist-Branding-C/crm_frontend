import type { FormField } from '../../../../shared/types/crud';
import type { Column } from '../../../../shared/types/crud';
import type { LeadSourceItem } from '../types';

export const formFields: FormField[] = [
  { name: 'source', label: 'Source', type: 'text', required: true, placeholder: 'Enter source' },
];

export const columns: Column<LeadSourceItem>[] = [
  { key: 'addedBy', label: 'Added By' },
  { key: 'source', label: 'Source', className: 'truncate-cell', render: (item) => <span title={item.source}>{item.source}</span> },
];
