import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { LeadStatusItem } from '../types/interface';
import type { UseLeadStatusTableActionsParams } from '../types/use-lead-status-table-actions.types';

/**
 * Composes the lead-status table's row-level and toolbar-level actions that each coordinate
 * two hook-owned pieces of state together in response to a single user action (edit/delete a
 * row closes the action dropdown; changing rows-per-page unwraps the select event).
 *
 * Notes:
 * - Takes only the narrow slices of table/drawer/dropdown/deleteConfirm it needs to coordinate,
 *   not the full hook objects, so LeadStatusPage.tsx still owns and reads from those hooks directly.
 */
export function useLeadStatusTableActions({ table, drawer, dropdown, deleteConfirm }: UseLeadStatusTableActionsParams) {
  const handleEditClick = useCallback((item: LeadStatusItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer, dropdown]);

  const handleDeleteClick = useCallback((item: LeadStatusItem) => {
    deleteConfirm.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [deleteConfirm, dropdown]);

  const handleRowsPerPageChange = useCallback((e: number | ChangeEvent<HTMLSelectElement>) => {
    const val = typeof e === 'number' ? e : Number(e.target.value);
    table.handleRowsPerPageChange(val);
  }, [table]);

  const clearError = useCallback(() => table.setError(''), [table]);

  return { handleEditClick, handleDeleteClick, handleRowsPerPageChange, clearError };
}
