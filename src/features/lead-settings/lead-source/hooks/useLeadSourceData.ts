import { useState, useCallback, useEffect, useRef } from 'react';
import { leadSourceService } from '../services';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadSource.mapper';
import type { LeadSourceItem, UpdateLeadSourcePayload } from '../types';

export function useLeadSourceData() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadSourceItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadSourceItem | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPageRef = useRef(rowsPerPage);
  useEffect(() => { rowsPerPageRef.current = rowsPerPage; }, [rowsPerPage]);

  const [items, setItems] = useState<LeadSourceItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ source: '' });

  const startIndex = (currentPage - 1) * rowsPerPage;

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leadSourceService.getLeadSources(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_SOURCES));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initalFetchDone = useRef(false);

  useEffect(() => {
    if (initalFetchDone.current) return;
    initalFetchDone.current = true;
    fetchData(1, rowsPerPage, '');
  }, []);

  const prevSearchQuery = useRef(searchQuery);

  useEffect(() => {
    if (searchQuery === prevSearchQuery.current) return;
    prevSearchQuery.current = searchQuery;
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchData(1, rowsPerPageRef.current, searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchData]);

  const handleSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchData(page, rowsPerPage, searchQuery);
  }, [rowsPerPage, searchQuery, fetchData]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setRowsPerPage(val);
    setCurrentPage(1);
    fetchData(1, val, searchQuery);
  }, [searchQuery, fetchData]);

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
    setFormData({ source: '' });
    setError(null);
  }, []);

  const handleEdit = useCallback((item: LeadSourceItem) => {
    setEditingItem(item);
    setShowForm(true);
    setDropdownOpen(null);
    setFormData({ source: item.source });
    setError(null);
  }, []);

  const handleDeleteClick = useCallback((item: LeadSourceItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (editingItem) {
      const payload: UpdateLeadSourcePayload = {};
      if (formData.source.trim() !== editingItem.source) payload.source = formData.source.trim();
      if (Object.keys(payload).length === 0) {
        setShowForm(false);
        setEditingItem(null);
        return;
      }
      setIsSaving(true);
      setError(null);
      try {
        const response = await leadSourceService.updateLeadSource(editingItem.id, payload);
        const updatedItem = mapApiToUI(response.data);
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        setShowForm(false);
        setEditingItem(null);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.UPDATE_LEAD_SOURCE));
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(true);
      setError(null);
      try {
        await leadSourceService.createLeadSource({
          source: formData.source.trim(),
        });
        setShowForm(false);
        setEditingItem(null);
        setCurrentPage(1);
        fetchData(1, rowsPerPage, searchQuery);
      } catch (err: unknown) {
        setError(getErrorMessage(err, ERROR_MESSAGES.CREATE_LEAD_SOURCE));
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
      await leadSourceService.deleteLeadSource(deletingItem.id);
      setDeletingItem(null);
      fetchData(currentPage, rowsPerPage, searchQuery);
    } catch (err: unknown) {
      setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_SOURCE));
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
