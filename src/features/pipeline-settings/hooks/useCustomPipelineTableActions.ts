import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { CustomPipelineItem } from '../types/interface';
import type { UseCustomPipelineTableActionsParams } from '../types/use-custom-pipeline-table-actions.types';


export function useCustomPipelineTableActions({
  table,
  drawer,
  dropdown,
  deleteConfirm,
}: UseCustomPipelineTableActionsParams) {
  const handleEditClick = useCallback(
    (item: CustomPipelineItem) => {
      drawer.openEditDrawer(item);
      dropdown.closeDropdown();
    },
    [drawer, dropdown],
  );

  const handleDeleteClick = useCallback(
    (item: CustomPipelineItem) => {
      deleteConfirm.handleDeleteClick(item);
      dropdown.closeDropdown();
    },
    [deleteConfirm, dropdown],
  );

  const handleRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      table.handleRowsPerPageChange(Number(e.target.value));
    },
    [table],
  );

  const clearError = useCallback(() => table.setError(''), [table]);

  return {
    handleEditClick,
    handleDeleteClick,
    handleRowsPerPageChange,
    clearError,
  };
}
