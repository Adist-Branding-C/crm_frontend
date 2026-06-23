import { useState, useCallback, useEffect, useRef } from 'react';
import { leadPurposeService } from '../services';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadPurpose.mapper';
import type { LeadPurposeItem, UpdateLeadPurposePayload } from '../types';

export function useLeadPurposeData() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadPurposeItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadPurposeItem | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<LeadPurposeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ title: '' });

  const startIndex = (currentPage - 1) * rowsPerPage;

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leadPurposeService.getLeadPurposes(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.totalPages ?? 1);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_PURPOSES));
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
    setFormData({ title: '' });
    setError(null);
  }, []);

  const handleEdit = useCallback((item: LeadPurposeItem) => {
    setEditingItem(item);
    setShowForm(true);
    setDropdownOpen(null);
    setFormData({ title: item.title });
    setError(null);
  }, []);

  const handleDeleteClick = useCallback((item: LeadPurposeItem) => {
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
        const payload: UpdateLeadPurposePayload = {};
        if (formData.title !== editingItem.title) payload.purpose = formData.title;
        await leadPurposeService.updateLeadPurpose(editingItem.id, payload);
        setShowForm(false);
        setEditingItem(null);
        fetchData(currentPage, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_PURPOSE));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      setError(null);
      try {
        await leadPurposeService.createLeadPurpose({
          purpose: formData.title,
        });
        setShowForm(false);
        setEditingItem(null);
        setCurrentPage(1);
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_PURPOSE));
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
      await leadPurposeService.deleteLeadPurpose(deletingItem.id);
      setDeletingItem(null);
      fetchData(currentPage, rowsPerPage, searchQuery);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_PURPOSE));
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
    setCurrentPage: handleSetCurrentPage,
    handleRowsPerPageChange,
    handleAdd,
    handleEdit,
    handleDeleteClick,
    handleCloseForm,
    handleSave,
    handleConfirmDelete,
    formData, setFormData,
    isLoading, isSaving, isDeleting, error,
  };
}
