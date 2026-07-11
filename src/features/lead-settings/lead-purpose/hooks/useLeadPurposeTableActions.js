import { useCallback } from 'react';
/**
 * Composes the lead-purpose table's row-level and toolbar-level actions that each coordinate
 * two hook-owned pieces of state together in response to a single user action (edit/delete a
 * row closes the action dropdown; changing rows-per-page unwraps the select event).
 *
 * Notes:
 * - Takes only the narrow slices of table/drawer/dropdown/deleteConfirm it needs to coordinate,
 *   not the full hook objects, so LeadPurposePage.tsx still owns and reads from those hooks directly.
 */
export function useLeadPurposeTableActions({ table, drawer, dropdown, deleteConfirm }) {
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer, dropdown]);
    const handleDeleteClick = useCallback((item) => {
        deleteConfirm.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [deleteConfirm, dropdown]);
    const handleRowsPerPageChange = useCallback((e) => {
        table.handleRowsPerPageChange(Number(e.target.value));
    }, [table]);
    const clearError = useCallback(() => table.setError(''), [table]);
    return { handleEditClick, handleDeleteClick, handleRowsPerPageChange, clearError };
}
//# sourceMappingURL=useLeadPurposeTableActions.js.map