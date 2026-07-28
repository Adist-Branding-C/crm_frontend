import { useState, useCallback } from 'react';
import { leadDataService } from '../services/leadDataService';
import { campaignLeadsApiService } from '../../campaigns/services';
import type { UpdateLeadPayload } from '../types';
import type { UseLeadBulkActionsReturn, UseLeadBulkActionsOptions } from '../types/hook.types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';

export function useLeadBulkActions(options: UseLeadBulkActionsOptions): UseLeadBulkActionsReturn {
  const { selectedIds, onRefresh, onShowToast, onClearSelection } = options;

  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showAssignStaffModal, setShowAssignStaffModal] = useState(false);
  const [showAssignCampaignModal, setShowAssignCampaignModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [isProcessingSelected, setIsProcessingSelected] = useState(false);

  const handleChangeStatusClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
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
      onShowToast(SUCCESS_MESSAGES.STATUS_UPDATED(successCount), 'success');
    } else {
      onShowToast(ERROR_MESSAGES.PARTIAL_SUCCESS(successCount, failCount), 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleAssignStaffClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
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
      onShowToast(SUCCESS_MESSAGES.STAFF_ASSIGNED(successCount), 'success');
    } else {
      onShowToast(ERROR_MESSAGES.PARTIAL_ASSIGN(successCount, failCount), 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleAssignCampaignClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
      return;
    }
    setShowAssignCampaignModal(true);
  }, [selectedIds, onShowToast]);

  const handleConfirmAssignCampaign = useCallback(async (campaignId: string) => {
    setIsProcessingSelected(true);
    try {
      const response = await campaignLeadsApiService.assignLeads(campaignId, selectedIds);
      setShowAssignCampaignModal(false);
      if (response.status) {
        onClearSelection([]);
        onShowToast(response.message || SUCCESS_MESSAGES.LEADS_ASSIGNED_TO_CAMPAIGN(selectedIds.length), 'success');
        onRefresh();
      } else {
        onShowToast(response.message || ERROR_MESSAGES.ASSIGN_CAMPAIGN_FAILED, 'error');
      }
    } catch (err) {
      setShowAssignCampaignModal(false);
      const message = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      onShowToast(message || ERROR_MESSAGES.ASSIGN_CAMPAIGN_FAILED, 'error');
    } finally {
      setIsProcessingSelected(false);
    }
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleDeleteSelectedClick = useCallback(() => {
    if (selectedIds.length === 0) {
      onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
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
      onShowToast(SUCCESS_MESSAGES.LEADS_DELETED(successCount), 'success');
    } else {
      onShowToast(ERROR_MESSAGES.PARTIAL_DELETE(successCount, failCount), 'error');
    }
    onRefresh();
  }, [selectedIds, onRefresh, onShowToast, onClearSelection]);

  const handleExportSelected = useCallback(() => {
    onShowToast(ERROR_MESSAGES.EXPORT_NOT_AVAILABLE, 'error');
  }, [onShowToast]);

  const handleDuplicateLeadAction = useCallback(() => {
    onShowToast(ERROR_MESSAGES.DUPLICATE_NOT_AVAILABLE, 'error');
  }, [onShowToast]);

  return {
    showChangeStatusModal,
    showAssignStaffModal,
    showAssignCampaignModal,
    showDeleteSelectedModal,
    isProcessingSelected,
    setShowChangeStatusModal,
    setShowAssignStaffModal,
    setShowAssignCampaignModal,
    setShowDeleteSelectedModal,
    handleChangeStatusClick,
    handleConfirmChangeStatus,
    handleAssignStaffClick,
    handleConfirmAssignStaff,
    handleAssignCampaignClick,
    handleConfirmAssignCampaign,
    handleDeleteSelectedClick,
    handleConfirmDeleteSelected,
    handleExportSelected,
    handleDuplicateLeadAction,
  };
}
