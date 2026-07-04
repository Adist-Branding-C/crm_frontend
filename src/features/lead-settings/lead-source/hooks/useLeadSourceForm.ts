import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { normalizeInput } from '../../utils/normalizeInput';
import type { LeadSourceItem, UpdateLeadSourcePayload, CreateLeadSourcePayload } from '../types';
import type { UseLeadSourceFormOptions } from '../types/hook.types';

export function useLeadSourceForm({
  items,
  fetchData,
  createSource,
  updateSource,
  currentPage,
  rowsPerPage,
  searchQuery,
  resetPage,
  onError,
  onDropdownClose,
}: UseLeadSourceFormOptions) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadSourceItem | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('update');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ source: '' });

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ source: '' });
    onError(null);
  }, [onError]);

  const handleEdit = useCallback((item: LeadSourceItem) => {
    setEditingItem(item);
    setShowForm(true);
    onDropdownClose();
    setFormData({ source: item.source });
    onError(null);
  }, [onError, onDropdownClose]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const buildUpdatePayload = useCallback((): UpdateLeadSourcePayload => {
    if (!editingItem) return {};
    const payload: UpdateLeadSourcePayload = {};
    const normalized = normalizeInput(formData.source);
    if (normalized !== normalizeInput(editingItem.source)) payload.source = normalized;
    return payload;
  }, [editingItem, formData]);

  const hasChanges = useMemo(() => {
    if (!editingItem) return true;
    return Object.keys(buildUpdatePayload()).length > 0;
  }, [buildUpdatePayload]);

  const handleSave = useCallback(() => {
    const normalizedValue = normalizeInput(formData.source);
    const isDuplicate = items.some(item => {
      if (editingItem && item.id === editingItem.id) return false;
      return normalizeInput(item.source) === normalizedValue;
    });
    if (isDuplicate) {
      onError(ERROR_MESSAGES.DUPLICATE_LEAD_SOURCE);
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
        await updateSource(String(editingItem.id), payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_SOURCE));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      onError(null);
      try {
        await createSource({ source: normalizeInput(formData.source) });
        setShowForm(false);
        setEditingItem(null);
        resetPage();
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_SOURCE));
      } finally {
        setIsSaving(false);
      }
    }
  }, [buildUpdatePayload, editingItem, formData, currentPage, rowsPerPage, searchQuery, fetchData, createSource, updateSource, onError, resetPage]);

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
