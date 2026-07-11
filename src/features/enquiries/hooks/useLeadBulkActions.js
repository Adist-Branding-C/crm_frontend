import { useState, useCallback } from 'react';
import { leadDataService } from '../services/leadDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
export function useLeadBulkActions(options) {
    const { selectedIds, onRefresh, onShowToast, onClearSelection } = options;
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [showAssignStaffModal, setShowAssignStaffModal] = useState(false);
    const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
    const [isProcessingSelected, setIsProcessingSelected] = useState(false);
    const handleChangeStatusClick = useCallback(() => {
        if (selectedIds.length === 0) {
            onShowToast(ERROR_MESSAGES.SELECT_AT_LEAST_ONE, 'error');
            return;
        }
        setShowChangeStatusModal(true);
    }, [selectedIds, onShowToast]);
    const handleConfirmChangeStatus = useCallback(async (statusId) => {
        setIsProcessingSelected(true);
        let successCount = 0;
        let failCount = 0;
        for (const id of selectedIds) {
            try {
                await leadDataService.updateLead(id, { statusId });
                successCount++;
            }
            catch {
                failCount++;
            }
        }
        setShowChangeStatusModal(false);
        onClearSelection([]);
        setIsProcessingSelected(false);
        if (failCount === 0) {
            onShowToast(SUCCESS_MESSAGES.STATUS_UPDATED(successCount), 'success');
        }
        else {
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
    const handleConfirmAssignStaff = useCallback(async (agentId) => {
        setIsProcessingSelected(true);
        let successCount = 0;
        let failCount = 0;
        for (const id of selectedIds) {
            try {
                await leadDataService.updateLead(id, { agentId });
                successCount++;
            }
            catch {
                failCount++;
            }
        }
        setShowAssignStaffModal(false);
        onClearSelection([]);
        setIsProcessingSelected(false);
        if (failCount === 0) {
            onShowToast(SUCCESS_MESSAGES.STAFF_ASSIGNED(successCount), 'success');
        }
        else {
            onShowToast(ERROR_MESSAGES.PARTIAL_ASSIGN(successCount, failCount), 'error');
        }
        onRefresh();
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
            }
            catch {
                failCount++;
            }
        }
        setShowDeleteSelectedModal(false);
        onClearSelection([]);
        setIsProcessingSelected(false);
        if (failCount === 0) {
            onShowToast(SUCCESS_MESSAGES.LEADS_DELETED(successCount), 'success');
        }
        else {
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
        handleDuplicateLeadAction,
    };
}
//# sourceMappingURL=useLeadBulkActions.js.map