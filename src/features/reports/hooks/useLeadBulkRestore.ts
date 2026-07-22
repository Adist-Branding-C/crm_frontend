import { useState, useCallback } from 'react';
import { leadDataService } from '../../enquiries/services/leadDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../enquiries/constants/messages';

interface UseLeadBulkRestoreOptions {
  selectedIds: string[];
  onRefresh: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onClearSelection: (ids: string[]) => void;
}

/**
 * Bulk-restore counterpart to useLeadBulkActions' delete-selected flow, for the
 * Deleted Leads report's "Recover Selected" toolbar action.
 */
export function useLeadBulkRestore(options: UseLeadBulkRestoreOptions) {
  const { selectedIds, onRefresh, onShowToast, onClearSelection } = options;

  const [showRestoreSelectedModal, setShowRestoreSelectedModal] = useState(false);
  const [isProcessingSelected, setIsProcessingSelected] = useState(false);

  const handleRestoreSelectedClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
      return;
    }
    setShowRestoreSelectedModal(true);
  }, [selectedIds, onShowToast]);

  const handleConfirmRestoreSelected = useCallback(async () => {
    setIsProcessingSelected(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of selectedIds) {
      try {
        await leadDataService.restoreLead(id);
        successCount++;
      } catch {
        failCount++;
      }
    }
    setShowRestoreSelectedModal(false);
    onClearSelection([]);
    setIsProcessingSelected(false);
    if (failCount === 0) {
      onShowToast(SUCCESS_MESSAGES.LEADS_RESTORED(successCount), 'success');
    } else {
      onShowToast(ERROR_MESSAGES.PARTIAL_RESTORE(successCount, failCount), 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  return {
    showRestoreSelectedModal,
    setShowRestoreSelectedModal,
    isProcessingSelected,
    handleRestoreSelectedClick,
    handleConfirmRestoreSelected,
  };
}
