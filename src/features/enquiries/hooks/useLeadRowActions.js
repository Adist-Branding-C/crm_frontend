import { useCallback } from 'react';
export function useLeadRowActions(actionMenu, detailDrawer, deleteConfirm) {
    const handleDeleteFromRow = useCallback((lead) => {
        actionMenu.close();
        deleteConfirm.handleDeleteClick(lead);
    }, [actionMenu.close, deleteConfirm.handleDeleteClick]);
    const handleDeleteFromDrawer = useCallback((lead) => {
        detailDrawer.close();
        deleteConfirm.handleDeleteClick(lead);
    }, [detailDrawer.close, deleteConfirm.handleDeleteClick]);
    return { handleDeleteFromRow, handleDeleteFromDrawer };
}
//# sourceMappingURL=useLeadRowActions.js.map