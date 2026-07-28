import type { Filters, AdditionalFieldDef } from './index';

export interface EnquiriesBulkActionCallbacks {
  onExportSelected: () => void;
  onChangeStatus: () => void;
  onAssignStaff: () => void;
  onAssignCampaign: () => void;
  onDuplicateLead: () => void;
  onDeleteSelected: () => void;
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
