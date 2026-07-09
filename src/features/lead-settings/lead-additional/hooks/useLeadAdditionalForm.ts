import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { FIELD_TYPES } from '../constants/fieldTypes';
import { useAdditionalFieldFormState } from './useAdditionalFieldFormState';
import type { LeadAdditionalItem, UpdateLeadAdditionalPayload } from '../types';
import type { UseLeadAdditionalFormOptions } from '../types/hook.types';

export function useLeadAdditionalForm({
  items,
  fetchData,
  createField,
  updateField,
  currentPage,
  rowsPerPage,
  searchQuery,
  resetPage,
  onError,
  onDropdownClose,
}: UseLeadAdditionalFormOptions) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadAdditionalItem | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('update');
  const [isSaving, setIsSaving] = useState(false);

  const formState = useAdditionalFieldFormState();

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    formState.resetForm();
    onError(null);
  }, [formState, onError]);

  const handleEditClick = useCallback((item: LeadAdditionalItem) => {
    setEditingItem(item);
    setShowForm(true);
    formState.populateForm(item);
    onDropdownClose();
    onError(null);
  }, [formState, onError, onDropdownClose]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onError(null);
    formState.handleInputChange(e);
  }, [formState, onError]);

  const buildUpdatePayload = useCallback((): UpdateLeadAdditionalPayload => {
    if (!editingItem) return {};
    const payload: UpdateLeadAdditionalPayload = {};
    const fd = formState.formData;
    if (fd.name !== editingItem.field) payload.name = fd.name;
    if (fd.showInFilter !== editingItem.inFilter) payload.showInFilter = fd.showInFilter;
    if (fd.showInList !== editingItem.inList) payload.showInList = fd.showInList;
    if (fd.isRequired !== editingItem.required) payload.isRequired = fd.isRequired;
    if (fd.connectWithLeadPurpose !== editingItem.purpose) payload.connectWithLeadPurpose = fd.connectWithLeadPurpose;
    if (fd.purposeId !== (editingItem.purposeId || '')) payload.purposeId = fd.purposeId || null;
    const isDropdownOrCheckbox = fd.fieldType === FIELD_TYPES.DROPDOWN || fd.fieldType === FIELD_TYPES.CHECKBOX;
    if (isDropdownOrCheckbox) {
      payload.fieldType = fd.fieldType;
      payload.values = fd.dropdownValues;
    } else {
      payload.values = [];
    }
    return payload;
  }, [editingItem, formState]);

  const hasChanges = useMemo(() => {
    if (!editingItem) return true;
    return Object.keys(buildUpdatePayload()).length > 0;
  }, [buildUpdatePayload]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const fd = formState.formData;
    const errors: string[] = [];
    if (!fd.name.trim()) errors.push(ERROR_MESSAGES.VALIDATION_FIELD_NAME_REQUIRED);
    if (!fd.fieldType) errors.push(ERROR_MESSAGES.VALIDATION_FIELD_TYPE_REQUIRED);
    if (fd.connectWithLeadPurpose && !fd.purposeId) errors.push(ERROR_MESSAGES.VALIDATION_LEAD_PURPOSE_REQUIRED);
    if (fd.fieldType === FIELD_TYPES.DROPDOWN && fd.dropdownValues.length === 0) errors.push(ERROR_MESSAGES.VALIDATION_DROPDOWN_VALUES);
    if (fd.fieldType === FIELD_TYPES.CHECKBOX && fd.dropdownValues.length === 0) errors.push(ERROR_MESSAGES.VALIDATION_CHECKBOX_VALUES);
    if (errors.length > 0) {
      onError(errors.join('\n'));
      return;
    }
    if (editingItem) {
      const payload = buildUpdatePayload();
      if (Object.keys(payload).length === 0) {
        formState.resetForm();
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
  }, [buildUpdatePayload, editingItem, formState, onError]);

  const executeSave = useCallback(async () => {
    setShowSaveConfirm(false);
    const fd = formState.formData;
    if (editingItem) {
      const payload = buildUpdatePayload();
      if (Object.keys(payload).length === 0) {
        formState.resetForm();
        setShowForm(false);
        setEditingItem(null);
        return;
      }
      setIsSaving(true);
      onError(null);
      try {
        await updateField(editingItem.id, payload);
        formState.resetForm();
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_ADDITIONAL_FIELD));
      } finally {
        setIsSaving(false);
      }
    } else {
      const isDropdownOrCheckbox = fd.fieldType === FIELD_TYPES.DROPDOWN || fd.fieldType === FIELD_TYPES.CHECKBOX;
      setIsSaving(true);
      onError(null);
      try {
        await createField({
          name: fd.name,
          fieldType: fd.fieldType,
          isRequired: fd.isRequired,
          showInList: fd.showInList,
          showInFilter: fd.showInFilter,
          connectWithLeadPurpose: fd.connectWithLeadPurpose,
          purposeId: fd.purposeId || null,
          values: isDropdownOrCheckbox ? fd.dropdownValues : [],
        });
        formState.resetForm();
        setShowForm(false);
        setEditingItem(null);
        resetPage();
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        onError(getErrorMessage(err, ERROR_MESSAGES.CREATE_ADDITIONAL_FIELD));
      } finally {
        setIsSaving(false);
      }
    }
  }, [buildUpdatePayload, editingItem, formState, currentPage, rowsPerPage, searchQuery, fetchData, createField, updateField, onError, resetPage]);

  const cancelSave = useCallback(() => {
    setShowSaveConfirm(false);
  }, []);

  const clearError = useCallback(() => onError(null), [onError]);

  return {
    showForm,
    setShowForm,
    editingItem,
    setEditingItem,
    formData: formState.formData,
    setFormData: formState.setFormData,
    showSaveConfirm,
    saveConfirmMode,
    isSaving,
    hasChanges,
    handleAddClick,
    handleEditClick,
    handleCloseForm,
    handleInputChange,
    handleSubmit,
    executeSave,
    cancelSave,
    clearError,
    handleDropdownValueChange: formState.handleDropdownValueChange,
    handleAddDropdownValue: formState.handleAddDropdownValue,
    handleRemoveDropdownValue: formState.handleRemoveDropdownValue,
  };
}
