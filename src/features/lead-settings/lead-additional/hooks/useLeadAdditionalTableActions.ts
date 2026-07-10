import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { LeadAdditionalItem } from '../types/interface';
import type { UseLeadAdditionalTableActionsParams } from '../types/use-lead-additional-table-actions.types';

/**
 * Composes the lead-additional table's row-level and toolbar-level actions that each coordinate
 * two hook-owned pieces of state together in response to a single user action (edit/delete a
 * row closes the action dropdown; changing rows-per-page unwraps the select event).
 *
 * Notes:
 * - Takes only the narrow slices of table/drawer/dropdown/deleteConfirm it needs to coordinate,
 *   not the full hook objects, so LeadAdditionalPage.tsx still owns and reads from those hooks
 *   directly.
 */
export function useLeadAdditionalTableActions({ table, drawer, dropdown, deleteConfirm, crud }: UseLeadAdditionalTableActionsParams) {
  const handleEditClick = useCallback((item: LeadAdditionalItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer, dropdown]);

  const handleDeleteClick = useCallback((item: LeadAdditionalItem) => {
    deleteConfirm.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [deleteConfirm, dropdown]);

  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    table.handleRowsPerPageChange(Number(e.target.value));
  }, [table]);

  const clearError = useCallback(() => crud.setError(null), [crud]);

  return { handleEditClick, handleDeleteClick, handleRowsPerPageChange, clearError };
}
