import type { LeadAdditionalItem } from './interface';

export interface UseLeadAdditionalTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
  };
  drawer: {
    openEditDrawer: (item: LeadAdditionalItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: LeadAdditionalItem) => void;
  };
  crud: {
    setError: (message: string | null) => void;
  };
}
