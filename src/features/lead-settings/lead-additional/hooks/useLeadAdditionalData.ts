import { useState, useCallback, useEffect, useRef } from 'react';
import { leadAdditionalService } from '../services/leadAdditionalService';
import { leadPurposeService } from '../../lead-purpose/services';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { FIELD_TYPES } from '../constants/fieldTypes';
import { mapApiToUI, mapPurposeApiToUI } from '../mappers/additionalField.mapper';
import { useLeadAdditionalForm } from './useLeadAdditionalForm';
import type {
  LeadAdditionalItem,
  UpdateLeadAdditionalPayload,
  LeadPurposeOption,
} from '../types';

export function useLeadAdditionalData() {
  const form = useLeadAdditionalForm();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadAdditionalItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadAdditionalItem | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<LeadAdditionalItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [purposes, setPurposes] = useState<LeadPurposeOption[]>([]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const fetchPurposes = useCallback(async () => {
    try {
      const response = await leadPurposeService.getLeadPurposes(1, 100);
      setPurposes((response.data.items || []).map(mapPurposeApiToUI));
    } catch {
      // purposes are non-critical for the main functionality
    }
  }, []);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leadAdditionalService.getAll(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.totalPages ?? 1);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.FETCH_ADDITIONAL_FIELDS));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1, rowsPerPage, '');
    fetchPurposes();
  }, []);

  const isFirstSearch = useRef(true);

  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchData(1, rowsPerPage, searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchData(page, rowsPerPage, searchQuery);
  }, [rowsPerPage, searchQuery, fetchData]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setRowsPerPage(val);
    fetchData(1, val, searchQuery);
  }, [searchQuery, fetchData]);

  const handleAddClick = useCallback(() => {
    setShowForm(true);
    setEditingItem(null);
    form.resetForm();
    setError(null);
  }, [form]);

  const handleEditClick = useCallback((item: LeadAdditionalItem) => {
    setShowForm(true);
    setEditingItem(item);
    form.populateForm(item);
    setDropdownOpen(null);
    setError(null);
  }, [form]);

  const handleDeleteClick = useCallback((item: LeadAdditionalItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const { formData } = form;
    if (editingItem) {
      setIsSaving(true);
      setError(null);
      try {
        const payload: UpdateLeadAdditionalPayload = {};
        if (formData.name !== editingItem.field) payload.name = formData.name;
        if (formData.fieldType !== editingItem.type) payload.fieldType = formData.fieldType;
        if (formData.showInFilter !== editingItem.inFilter) payload.showInFilter = formData.showInFilter;
        if (formData.showInList !== editingItem.inList) payload.showInList = formData.showInList;
        if (formData.isRequired !== editingItem.required) payload.isRequired = formData.isRequired;
        if (formData.connectWithLeadPurpose !== editingItem.purpose) payload.connectWithLeadPurpose = formData.connectWithLeadPurpose;
        if (formData.purposeId !== (editingItem.purposeId || '')) payload.purposeId = formData.purposeId || null;
        if (formData.fieldType === FIELD_TYPES.DROPDOWN || formData.fieldType === FIELD_TYPES.CHECKBOX) {
          payload.values = formData.dropdownValues;
        }
        await leadAdditionalService.update(editingItem.id, payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_ADDITIONAL_FIELD));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      setError(null);
      try {
        await leadAdditionalService.create({
          name: formData.name,
          fieldType: formData.fieldType,
          isRequired: formData.isRequired,
          showInList: formData.showInList,
          showInFilter: formData.showInFilter,
          connectWithLeadPurpose: formData.connectWithLeadPurpose,
          purposeId: formData.purposeId || null,
          ...((formData.fieldType === FIELD_TYPES.DROPDOWN || formData.fieldType === FIELD_TYPES.CHECKBOX)
            ? { values: formData.dropdownValues }
            : {}),
        });
        setShowForm(false);
        setEditingItem(null);
        setCurrentPage(1);
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.CREATE_ADDITIONAL_FIELD));
      } finally {
        setIsSaving(false);
      }
    }
  }, [editingItem, form, currentPage, rowsPerPage, searchQuery, fetchData]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    setError(null);
    try {
      await leadAdditionalService.delete(deletingItem.id);
      setDeletingItem(null);
      fetchData(currentPage, rowsPerPage, searchQuery);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_ADDITIONAL_FIELD));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, currentPage, rowsPerPage, searchQuery, fetchData]);

  return {
    paginatedData: items,
    totalItems: total,
    showForm, setShowForm,
    editingItem, setEditingItem,
    deletingItem, setDeletingItem,
    dropdownOpen, setDropdownOpen,
    searchQuery, setSearchQuery,
    currentPage,
    totalPages,
    startIndex,
    rowsPerPage,
    purposes,
    setCurrentPage: handleSetCurrentPage,
    handleRowsPerPageChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCloseForm,
    handleSubmit,
    handleConfirmDelete,
    formData: form.formData,
    setFormData: form.setFormData,
    handleInputChange: form.handleInputChange,
    handleDropdownValueChange: form.handleDropdownValueChange,
    handleAddDropdownValue: form.handleAddDropdownValue,
    handleRemoveDropdownValue: form.handleRemoveDropdownValue,
    isLoading, isSaving, isDeleting, error,
  };
}
