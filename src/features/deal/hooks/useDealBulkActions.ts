import { useState, useCallback } from 'react';
import { dealService } from '../services/deal.service';

interface UseDealBulkActionsOptions {
  selectedIds: string[];
  onRefresh: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onClearSelection: () => void;
}

/**
 * Bulk stage-change / owner-reassignment for the Deals table's selected
 * rows - each action is a single request to the Phase 8 bulk endpoints
 * (`/deals/bulk/stage`, `/deals/bulk/owner`), not a per-row loop from the
 * frontend (unlike Enquiries' bulk actions, which predate those endpoints).
 *
 * Used by:
 * - DealPage
 */
export function useDealBulkActions({ selectedIds, onRefresh, onShowToast, onClearSelection }: UseDealBulkActionsOptions) {
  const [showChangeStageModal, setShowChangeStageModal] = useState(false);
  const [showReassignOwnerModal, setShowReassignOwnerModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const requireSelection = useCallback((): boolean => {
    if (selectedIds.length === 0) {
      onShowToast('Select at least one deal first', 'error');
      return false;
    }
    return true;
  }, [selectedIds, onShowToast]);

  const handleChangeStageClick = useCallback(() => {
    if (requireSelection()) setShowChangeStageModal(true);
  }, [requireSelection]);

  const handleReassignOwnerClick = useCallback(() => {
    if (requireSelection()) setShowReassignOwnerModal(true);
  }, [requireSelection]);

  const reportResult = useCallback(
    (result: { updated: number; failed: { dealId: string; reason: string }[] } | undefined, verb: string) => {
      if (!result) {
        onShowToast(`Failed to ${verb} the selected deals`, 'error');
        return;
      }
      if (result.failed.length === 0) {
        onShowToast(`${verb.charAt(0).toUpperCase()}${verb.slice(1)}d ${result.updated} deal(s)`, 'success');
      } else {
        onShowToast(`${result.updated} updated, ${result.failed.length} failed - ${result.failed[0]?.reason ?? ''}`, 'error');
      }
    },
    [onShowToast],
  );

  const handleConfirmChangeStage = useCallback(
    async (stageId: string, lostReason?: string) => {
      setIsProcessing(true);
      try {
        const response = await dealService.bulkChangeStage(selectedIds, Number(stageId), lostReason);
        setShowChangeStageModal(false);
        onClearSelection();
        reportResult(response.data, 'update');
        onRefresh();
      } catch {
        setShowChangeStageModal(false);
        onShowToast('Failed to change stage for the selected deals', 'error');
      } finally {
        setIsProcessing(false);
      }
    },
    [selectedIds, onClearSelection, onRefresh, reportResult, onShowToast],
  );

  const handleConfirmReassignOwner = useCallback(
    async (agentId: string) => {
      setIsProcessing(true);
      try {
        const response = await dealService.bulkReassignOwner(selectedIds, agentId);
        setShowReassignOwnerModal(false);
        onClearSelection();
        reportResult(response.data, 'reassign');
        onRefresh();
      } catch {
        setShowReassignOwnerModal(false);
        onShowToast('Failed to reassign owner for the selected deals', 'error');
      } finally {
        setIsProcessing(false);
      }
    },
    [selectedIds, onClearSelection, onRefresh, reportResult, onShowToast],
  );

  return {
    showChangeStageModal,
    showReassignOwnerModal,
    isProcessing,
    setShowChangeStageModal,
    setShowReassignOwnerModal,
    handleChangeStageClick,
    handleReassignOwnerClick,
    handleConfirmChangeStage,
    handleConfirmReassignOwner,
  };
}
