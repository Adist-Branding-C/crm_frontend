import type { CustomPipelineItem } from './interface';

export interface UseCustomPipelineTableActionsParams {
  table: {
    handleRowsPerPageChange: (value: number) => void;
    setError: (message: string) => void;
  };
  drawer: {
    openEditDrawer: (item: CustomPipelineItem) => void;
  };
  dropdown: {
    closeDropdown: () => void;
  };
  deleteConfirm: {
    handleDeleteClick: (item: CustomPipelineItem) => void;
  };
}
