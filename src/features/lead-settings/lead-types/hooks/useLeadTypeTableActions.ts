import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { LeadTypeItem } from '../types/interface';
import type { UseLeadTypeTableActionsParams } from '../types/use-lead-type-table-actions.types';

/**
 * Composes the lead-types table's row-level and toolbar-level actions that each coordinate
 * two hook-owned pieces of state together in response to a single user action (edit/delete a
 * row closes the action dropdown; changing rows-per-page unwraps the select event).
 *
 * Notes:
 * - Takes only the narrow slices of table/drawer/dropdown/deleteConfirm it needs to coordinate,
 *   not the full hook objects, so LeadTypesPage.tsx still owns and reads from those hooks directly.
 */
export function useLeadTypeTableActions({ table, drawer, dropdown, deleteConfirm }: UseLeadTypeTableActionsParams) {
  const handleEditClick = useCallback((item: LeadTypeItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer, dropdown]);

  const handleDeleteClick = useCallback((item: LeadTypeItem) => {
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
