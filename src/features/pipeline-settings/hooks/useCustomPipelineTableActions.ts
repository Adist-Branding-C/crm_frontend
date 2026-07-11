import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { CustomPipelineItem } from '../types/interface';
import type { UseCustomPipelineTableActionsParams } from '../types/use-custom-pipeline-table-actions.types';

/**
 * Composes the custom-pipeline table's row-level and toolbar-level actions that each coordinate
 * two hook-owned pieces of state together in response to a single user action (edit/delete a
 * row closes the action dropdown; changing rows-per-page unwraps the select event).
 *
 * Notes:
 * - Takes only the narrow slices of table/drawer/dropdown/deleteConfirm it needs to coordinate,
 *   not the full hook objects, so CustomPipelinePage.tsx still owns and reads from those hooks directly.
 */
export function useCustomPipelineTableActions({ table, drawer, dropdown, deleteConfirm }: UseCustomPipelineTableActionsParams) {
  const handleEditClick = useCallback((item: CustomPipelineItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer, dropdown]);

  const handleDeleteClick = useCallback((item: CustomPipelineItem) => {
    deleteConfirm.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [deleteConfirm, dropdown]);

  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    table.handleRowsPerPageChange(Number(e.target.value));
  }, [table]);

  const clearError = useCallback(() => table.setError(''), [table]);

  return { handleEditClick, handleDeleteClick, handleRowsPerPageChange, clearError };
}
