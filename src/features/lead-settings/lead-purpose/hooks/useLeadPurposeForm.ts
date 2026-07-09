import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { normalizeInput } from '../../utils/normalizeInput';
import type { LeadPurposeItem, UpdateLeadPurposePayload, CreateLeadPurposePayload } from '../types';
import type { UseLeadPurposeFormOptions } from '../types/hook.types';

export function useLeadPurposeForm({
  items,
  fetchData,
  createPurpose,
  updatePurpose,
  currentPage,
  rowsPerPage,
  searchQuery,
  resetPage,
  onError,
  onDropdownClose,
}: UseLeadPurposeFormOptions) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadPurposeItem | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('update');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '' });

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ title: '' });
    onError(null);
  }, [onError]);

  const handleEdit = useCallback((item: LeadPurposeItem) => {
    setEditingItem(item);
    setShowForm(true);
    onDropdownClose();
    setFormData({ title: item.title });
    onError(null);
  }, [onError, onDropdownClose]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const buildUpdatePayload = useCallback((): UpdateLeadPurposePayload => {
    if (!editingItem) return {};
    const payload: UpdateLeadPurposePayload = {};
    const normalized = normalizeInput(formData.title);
    if (normalized !== normalizeInput(editingItem.title)) payload.purpose = normalized;
    return payload;
  }, [editingItem, formData]);

  const hasChanges = useMemo(() => {
    if (!editingItem) return true;
    return Object.keys(buildUpdatePayload()).length > 0;
  }, [buildUpdatePayload]);

  const handleSave = useCallback(() => {
    const normalizedValue = normalizeInput(formData.title);
    const isDuplicate = items.some(item => {
      if (editingItem && item.id === editingItem.id) return false;
      return normalizeInput(item.title) === normalizedValue;
    });
    if (isDuplicate) {
      onError(ERROR_MESSAGES.DUPLICATE_LEAD_PURPOSE);
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
        await updatePurpose(String(editingItem.id), payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_PURPOSE));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      onError(null);
      try {
        await createPurpose({ purpose: normalizeInput(formData.title) });
        setShowForm(false);
        setEditingItem(null);
        resetPage();
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_PURPOSE));
      } finally {
        setIsSaving(false);
      }
    }
  }, [buildUpdatePayload, editingItem, formData, currentPage, rowsPerPage, searchQuery, fetchData, createPurpose, updatePurpose, onError, resetPage]);

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
