import { useState, useCallback, useEffect, useRef } from 'react';
import { leadStatusService } from '../services';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadStatus.mapper';
import type { LeadStatusItem, UpdateLeadStatusPayload } from '../types';

export function useLeadStatusData() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadStatusItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadStatusItem | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<LeadStatusItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ status: '', color: '#3b82f6', useForConversion: false });

  const startIndex = (currentPage - 1) * rowsPerPage;

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leadStatusService.getLeadStatuses(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.totalPages ?? 1);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_STATUSES));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1, rowsPerPage, '');
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

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ status: '', color: '#3b82f6', useForConversion: false });
    setError(null);
  }, []);

  const handleEdit = useCallback((item: LeadStatusItem) => {
    setEditingItem(item);
    setShowForm(true);
    setDropdownOpen(null);
    setFormData({ status: item.status, color: item.color, useForConversion: item.useForConversion });
    setError(null);
  }, []);

  const handleDeleteClick = useCallback((item: LeadStatusItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (editingItem) {
      setIsSaving(true);
      setError(null);
      try {
        const payload: UpdateLeadStatusPayload = {};
        if (formData.status !== editingItem.status) payload.status = formData.status;
        if (formData.color !== editingItem.color) payload.color = formData.color;
        if (formData.useForConversion !== editingItem.useForConversion) payload.conversion = formData.useForConversion;
        await leadStatusService.updateLeadStatus(String(editingItem.id), payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_STATUS));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      setError(null);
      try {
        await leadStatusService.createLeadStatus({
          status: formData.status,
          color: formData.color,
          conversion: formData.useForConversion,
        });
        setShowForm(false);
        setEditingItem(null);
        setCurrentPage(1);
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_STATUS));
      } finally {
        setIsSaving(false);
      }
    }
  }, [editingItem, formData, currentPage, rowsPerPage, searchQuery, fetchData]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    setError(null);
    try {
      await leadStatusService.deleteLeadStatus(String(deletingItem.id));
      setDeletingItem(null);
      fetchData(currentPage, rowsPerPage, searchQuery);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_STATUS));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, currentPage, rowsPerPage, searchQuery, fetchData]);

  const clearError = useCallback(() => setError(null), []);

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
    setCurrentPage: handleSetCurrentPage,
    handleRowsPerPageChange,
    handleAdd,
    handleEdit,
    handleDeleteClick,
    handleCloseForm,
    handleSave,
    handleConfirmDelete,
    formData, setFormData,
    isLoading, isSaving, isDeleting, error, clearError,
  };
}
