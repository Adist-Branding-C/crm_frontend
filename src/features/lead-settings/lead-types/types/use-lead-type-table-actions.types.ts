import type { LeadTypeItem } from './interface';

export interface UseLeadTypeTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
    setError: (message: string) => void;
  };
  drawer: {
    openEditDrawer: (item: LeadTypeItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: LeadTypeItem) => void;
  };
}
