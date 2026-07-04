import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { normalizeInput } from '../../utils/normalizeInput';
import type { LeadStatusItem, UpdateLeadStatusPayload, CreateLeadStatusPayload } from '../types';
import type { UseLeadStatusFormOptions } from '../types/hook.types';

export function useLeadStatusForm({
  items,
  fetchData,
  createStatus,
  updateStatus,
  currentPage,
  rowsPerPage,
  searchQuery,
  resetPage,
  onError,
  onDropdownClose,
}: UseLeadStatusFormOptions) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadStatusItem | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('update');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ status: '', color: '#3b82f6', useForConversion: false });

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ status: '', color: '#3b82f6', useForConversion: false });
    onError(null);
  }, [onError]);

  const handleEdit = useCallback((item: LeadStatusItem) => {
    setEditingItem(item);
    setShowForm(true);
    onDropdownClose();
    setFormData({ status: item.status, color: item.color, useForConversion: item.useForConversion });
    onError(null);
  }, [onError, onDropdownClose]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const buildUpdatePayload = useCallback((): UpdateLeadStatusPayload => {
    if (!editingItem) return {};
    const payload: UpdateLeadStatusPayload = {};
    const normalized = normalizeInput(formData.status);
    if (normalized !== normalizeInput(editingItem.status)) payload.status = normalized;
    if (formData.color !== editingItem.color) payload.color = formData.color;
    if (formData.useForConversion !== editingItem.useForConversion) payload.conversion = formData.useForConversion;
    return payload;
  }, [editingItem, formData]);

  const hasChanges = useMemo(() => {
    if (!editingItem) return true;
    return Object.keys(buildUpdatePayload()).length > 0;
  }, [buildUpdatePayload]);

  const handleSave = useCallback(() => {
    const normalizedValue = normalizeInput(formData.status);
    const isDuplicate = items.some(item => {
      if (editingItem && item.id === editingItem.id) return false;
      return normalizeInput(item.status) === normalizedValue;
    });
    if (isDuplicate) {
      onError(ERROR_MESSAGES.DUPLICATE_LEAD_STATUS);
      return;
    }
    if (editingItem) {
      const payload = buildUpdatePayload();
      if (Object.keys(payload).length === 0) {
        setShowForm(false);
        setEditingItem(null);
        return;
      }
      setSaveConfirmMode('update');
      setShowSaveConfirm(true);
    } else {
      setSaveConfirmMode('create');
      setShowSaveConfirm(true);
    }
  }, [buildUpdatePayload, editingItem, formData, items, onError]);

  const executeSave = useCallback(async () => {
    setShowSaveConfirm(false);
    if (editingItem) {
      const payload = buildUpdatePayload();
      if (Object.keys(payload).length === 0) {
        setShowForm(false);
        setEditingItem(null);
        return;
      }
      setIsSaving(true);
      onError(null);
      try {
        await updateStatus(String(editingItem.id), payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_STATUS));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      onError(null);
      try {
        await createStatus({
          status: normalizeInput(formData.status),
          color: formData.color,
          conversion: formData.useForConversion,
        });
        setShowForm(false);
        setEditingItem(null);
        resetPage();
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_STATUS));
      } finally {
        setIsSaving(false);
      }
    }
  }, [buildUpdatePayload, editingItem, formData, currentPage, rowsPerPage, searchQuery, fetchData, createStatus, updateStatus, onError, resetPage]);

  const cancelSave = useCallback(() => {
    setShowSaveConfirm(false);
  }, []);

  const clearError = useCallback(() => onError(null), [onError]);

  return {
    showForm,
    setShowForm,
    editingItem,
    setEditingItem,
    formData,
    setFormData,
    showSaveConfirm,
    saveConfirmMode,
    isSaving,
    hasChanges,
    handleAdd,
    handleEdit,
    handleCloseForm,
    handleSave,
    executeSave,
    cancelSave,
    clearError,
  };
}
