import type { Filters, AdditionalFieldDef } from './index';
import type { SortConfig } from '../../../shared/types/sort';
import type { LeadDropdownState } from './hook.types';

export interface EnquiriesBulkActionCallbacks {
  onExportSelected: () => void;
  onChangeStatus: () => void;
  onAssignStaff: () => void;
  onSendFollowUp: () => void;
  onDuplicateLead: () => void;
  onDeleteSelected: () => void;
}

export interface EnquiriesToolbarActionsProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSortDesc: (key: string) => void;
  onSortAsc: (key: string) => void;
  sortDropdown: LeadDropdownState;
  actionsDropdown: LeadDropdownState;
  onToggleSort: () => void;
  onToggleActions: () => void;
  selectedCount: number;
  bulkActions: EnquiriesBulkActionCallbacks;
  onAddLead: () => void;
}

export interface EnquiriesFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export interface AdditionalFieldControlProps {
  field: AdditionalFieldDef;
  value: string;
  onChange: (value: string) => void;
}
