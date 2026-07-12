import { useCallback } from 'react';
import type { Lead } from '../types';
import type { UseLeadActionMenuReturn, UseLeadRowActionsReturn } from '../types/hook.types';

interface DeleteConfirm {
  handleDeleteClick: (lead: Lead) => void;
}

interface DetailDrawer {
  close: () => void;
}

export function useLeadRowActions(
  actionMenu: UseLeadActionMenuReturn,
  detailDrawer: DetailDrawer,
  deleteConfirm: DeleteConfirm,
): UseLeadRowActionsReturn {
  const handleDeleteFromRow = useCallback((lead: Lead) => {
    actionMenu.close();
    deleteConfirm.handleDeleteClick(lead);
  }, [actionMenu.close, deleteConfirm.handleDeleteClick]);

  const handleDeleteFromDrawer = useCallback((lead: Lead) => {
    detailDrawer.close();
    deleteConfirm.handleDeleteClick(lead);
  }, [detailDrawer.close, deleteConfirm.handleDeleteClick]);

  return { handleDeleteFromRow, handleDeleteFromDrawer };
}
