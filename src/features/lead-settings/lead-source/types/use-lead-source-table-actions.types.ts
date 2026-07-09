import type { LeadSourceItem } from './interface';

export interface UseLeadSourceTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
    setError: (message: string) => void;
  };
  drawer: {
    openEditDrawer: (item: LeadSourceItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: LeadSourceItem) => void;
  };
}
