import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { normalizeInput } from '../../utils/normalizeInput';
import type { LeadTypeItem, UpdateLeadTypePayload, CreateLeadTypePayload } from '../types';
import type { UseLeadTypesFormOptions } from '../types/hook.types';

export function useLeadTypesForm({
  items,
  fetchData,
  createType,
  updateType,
  currentPage,
  rowsPerPage,
  searchQuery,
  resetPage,
  onError,
  onDropdownClose,
}: UseLeadTypesFormOptions) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadTypeItem | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('update');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ type: '' });

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ type: '' });
    onError(null);
  }, [onError]);

  const handleEdit = useCallback((item: LeadTypeItem) => {
    setEditingItem(item);
    setShowForm(true);
    onDropdownClose();
    setFormData({ type: item.type });
    onError(null);
  }, [onError, onDropdownClose]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const buildUpdatePayload = useCallback((): UpdateLeadTypePayload => {
    if (!editingItem) return {};
    const payload: UpdateLeadTypePayload = {};
    const normalized = normalizeInput(formData.type);
    if (normalized !== normalizeInput(editingItem.type)) payload.type = normalized;
    return payload;
  }, [editingItem, formData]);

  const hasChanges = useMemo(() => {
    if (!editingItem) return true;
    return Object.keys(buildUpdatePayload()).length > 0;
  }, [buildUpdatePayload]);

  const handleSave = useCallback(() => {
    const normalizedValue = normalizeInput(formData.type);
    const isDuplicate = items.some(item => {
      if (editingItem && item.id === editingItem.id) return false;
      return normalizeInput(item.type) === normalizedValue;
    });
    if (isDuplicate) {
      onError(ERROR_MESSAGES.DUPLICATE_LEAD_TYPE);
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
        await updateType(String(editingItem.id), payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_TYPE));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      onError(null);
      try {
        await createType({ type: normalizeInput(formData.type) });
        setShowForm(false);
        setEditingItem(null);
        resetPage();
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_TYPE));
      } finally {
        setIsSaving(false);
      }
    }
  }, [buildUpdatePayload, editingItem, formData, currentPage, rowsPerPage, searchQuery, fetchData, createType, updateType, onError, resetPage]);

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
