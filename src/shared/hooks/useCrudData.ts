import { useState, useMemo, useCallback } from 'react';
import { useTablePagination } from './useTablePagination';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';

export function useCrudData<T extends { id: number }>(initialData: T[]) {
  const [data, setData] = useState(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(item =>
      Object.values(item as unknown as Record<string, unknown>).some(val =>
        String(val ?? '').toLowerCase().includes(q)
      )
    );
  }, [data, searchQuery]);

  const pagination = useTablePagination(filteredData, rowsPerPage);

  const { setCurrentPage } = pagination;

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowForm(true);
  }, []);

  const handleEditClick = useCallback((item: T) => {
    setEditingItem(item);
    setShowForm(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: T) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingItem) return;
    setData(prev => prev.filter(d => d.id !== deletingItem.id));
    setDeletingItem(null);
  }, [deletingItem]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  const handleSave = useCallback((formData: Record<string, unknown>) => {
    if (editingItem) {
      setData(prev => prev.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } as T : item
      ));
    } else {
      const newItem = { id: Date.now(), ...formData } as unknown as T;
      setData(prev => [...prev, newItem]);
    }
    setCurrentPage(1);
    setShowForm(false);
    setEditingItem(null);
  }, [editingItem, setCurrentPage]);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setRowsPerPage(val);
    pagination.setCurrentPage(1);
  }, [pagination]);

  return {
    data, setData,
    filteredData,
    showForm, setShowForm,
    editingItem, setEditingItem,
    deletingItem, setDeletingItem,
    dropdownOpen, setDropdownOpen,
    searchQuery, setSearchQuery,
    rowsPerPage, setRowsPerPage,
    handleRowsPerPageChange,
    currentPage: pagination.currentPage,
    setCurrentPage: pagination.setCurrentPage,
    totalPages: pagination.totalPages,
    startIndex: pagination.startIndex,
    paginatedData: pagination.paginatedData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleSave,
  };
}
