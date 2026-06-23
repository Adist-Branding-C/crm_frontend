import type { DealAdditionalField } from './deal-additional-field.types';
import type { Column } from '../../../../shared/types/crud';

export interface DealAdditionalFieldTableProps {
  data: DealAdditionalField[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  addLabel: string;
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startIndex: number;
  dropdownOpen: string | null;
  dropdownDirection: 'down' | 'up';
  setDropdownOpen: (key: string | null) => void;
  setDropdownDirection: (dir: 'down' | 'up') => void;
  handleEditClick: (item: DealAdditionalField) => void;
  handleDeleteClick: (item: DealAdditionalField) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const ADDITIONAL_FIELD_COLUMNS: Column<DealAdditionalField>[] = [
  { key: 'field', label: 'Field' },
  { key: 'type', label: 'Type' },
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
];
