import { useCallback } from 'react';
import type { Lead } from '../../enquiries/types';
import type { UseLeadActionMenuReturn } from '../../enquiries/types/hook.types';

interface RestoreConfirm {
  handleDeleteClick: (lead: Lead) => void;
}

export function useLeadRestoreRowAction(actionMenu: UseLeadActionMenuReturn, restoreConfirm: RestoreConfirm) {
  const handleRestoreFromRow = useCallback((lead: Lead) => {
    actionMenu.close();
    restoreConfirm.handleDeleteClick(lead);
  }, [actionMenu.close, restoreConfirm.handleDeleteClick]);

  return { handleRestoreFromRow };
}
