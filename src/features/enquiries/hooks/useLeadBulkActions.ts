import { useState, useCallback } from 'react';
import { leadDataService } from '../services/leadDataService';
import type { UpdateLeadPayload } from '../types';
import type { UseLeadBulkActionsReturn, UseLeadBulkActionsOptions } from '../types/hook.types';

export function useLeadBulkActions(options: UseLeadBulkActionsOptions): UseLeadBulkActionsReturn {
  const { selectedIds, onRefresh, onShowToast, onClearSelection } = options;

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showAssignStaffModal, setShowAssignStaffModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [isProcessingSelected, setIsProcessingSelected] = useState(false);

  const handleChangeStatusClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast('Please select at least one lead', 'error');
      return;
    }
    setShowChangeStatusModal(true);
  }, [selectedIds, onShowToast]);

  const handleConfirmChangeStatus = useCallback(async (statusId: string) => {
    setIsProcessingSelected(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of selectedIds) {
      try {
        await leadDataService.updateLead(id, { statusId } as UpdateLeadPayload);
        successCount++;
      } catch {
        failCount++;
      }
    }
    setShowChangeStatusModal(false);
    onClearSelection([]);
    setIsProcessingSelected(false);
    if (failCount === 0) {
      onShowToast(`Status updated for ${successCount} lead(s)`, 'success');
    } else {
      onShowToast(`${successCount} updated, ${failCount} failed`, 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleAssignStaffClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast('Please select at least one lead', 'error');
      return;
    }
    setShowAssignStaffModal(true);
  }, [selectedIds, onShowToast]);

  const handleConfirmAssignStaff = useCallback(async (agentId: string) => {
    setIsProcessingSelected(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of selectedIds) {
      try {
        await leadDataService.updateLead(id, { agentId } as UpdateLeadPayload);
        successCount++;
      } catch {
        failCount++;
      }
    }
    setShowAssignStaffModal(false);
    onClearSelection([]);
    setIsProcessingSelected(false);
    if (failCount === 0) {
      onShowToast(`Staff assigned to ${successCount} lead(s)`, 'success');
    } else {
      onShowToast(`${successCount} assigned, ${failCount} failed`, 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleDeleteSelectedClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast('Please select at least one lead', 'error');
      return;
    }
    setShowDeleteSelectedModal(true);
  }, [selectedIds, onShowToast]);

  const handleConfirmDeleteSelected = useCallback(async () => {
    setIsProcessingSelected(true);
    let successCount = 0;
    let failCount = 0;
    for (const id of selectedIds) {
      try {
        await leadDataService.deleteLead(id);
        successCount++;
      } catch {
        failCount++;
      }
    }
    setShowDeleteSelectedModal(false);
    onClearSelection([]);
    setIsProcessingSelected(false);
    if (failCount === 0) {
      onShowToast(`${successCount} lead(s) deleted successfully`, 'success');
    } else {
      onShowToast(`${successCount} deleted, ${failCount} failed`, 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleExportSelected = useCallback(() => {
    onShowToast('Export API not available', 'error');
  }, [onShowToast]);

  const handleSendFollowUp = useCallback(() => {
    onShowToast('Follow Up API not available', 'error');
  }, [onShowToast]);

  const handleDuplicateLeadAction = useCallback(() => {
    onShowToast('Duplicate Lead API not available', 'error');
  }, [onShowToast]);

  return {
    showChangeStatusModal,
    showAssignStaffModal,
    showDeleteSelectedModal,
    isProcessingSelected,
    setShowChangeStatusModal,
    setShowAssignStaffModal,
    setShowDeleteSelectedModal,
    handleChangeStatusClick,
    handleConfirmChangeStatus,
    handleAssignStaffClick,
    handleConfirmAssignStaff,
    handleDeleteSelectedClick,
    handleConfirmDeleteSelected,
    handleExportSelected,
    handleSendFollowUp,
    handleDuplicateLeadAction,
  };
}
