import type { LeadStatusItem } from './interface';

export interface UseLeadStatusTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
    setError: (message: string) => void;
  };
  drawer: {
    openEditDrawer: (item: LeadStatusItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: LeadStatusItem) => void;
  };
}
