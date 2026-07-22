import type { LeadPurposeItem } from './interface';

export interface UseLeadPurposeTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
    setError: (message: string) => void;
  };
  drawer: {
    openEditDrawer: (item: LeadPurposeItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: LeadPurposeItem) => void;
  };
}
