import { useCallback } from 'react';
import type { DealItem } from '../types/interface';
import type { UseDealActionMenuReturn, UseDealRowActionsReturn } from '../types/hook.types';

interface DeleteConfirm {
  handleDeleteClick: (deal: DealItem) => void;
}

interface DetailDrawer {
  closeDrawer: () => void;
}

export function useDealRowActions(
  actionMenu: UseDealActionMenuReturn,
  detailDrawer: DetailDrawer,
  deleteConfirm: DeleteConfirm,
): UseDealRowActionsReturn {
  const handleDeleteFromRow = useCallback((deal: DealItem) => {
    actionMenu.close();
    deleteConfirm.handleDeleteClick(deal);
  }, [actionMenu.close, deleteConfirm.handleDeleteClick]);

  const handleDeleteFromDrawer = useCallback((deal: DealItem) => {
    detailDrawer.closeDrawer();
    deleteConfirm.handleDeleteClick(deal);
  }, [detailDrawer.closeDrawer, deleteConfirm.handleDeleteClick]);

  return { handleDeleteFromRow, handleDeleteFromDrawer };
}
