import { useState, useMemo, useCallback } from 'react';
import { useTablePagination } from './useTablePagination';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';
export function useCrudData(initialData) {
    const [data, setData] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const filteredData = useMemo(() => {
        if (!searchQuery)
            return data;
        const q = searchQuery.toLowerCase();
        return data.filter(item => Object.values(item).some(val => String(val ?? '').toLowerCase().includes(q)));
    }, [data, searchQuery]);
    const pagination = useTablePagination(filteredData, rowsPerPage);
    const { setCurrentPage } = pagination;
    const handleAddClick = useCallback(() => {
        setEditingItem(null);
        setShowForm(true);
    }, []);
    const handleEditClick = useCallback((item) => {
        setEditingItem(item);
        setShowForm(true);
        setDropdownOpen(null);
    }, []);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    }, []);
    const handleConfirmDelete = useCallback(() => {
        if (!deletingItem)
            return;
        setData(prev => prev.filter(d => d.id !== deletingItem.id));
        setDeletingItem(null);
    }, [deletingItem]);
    const handleCloseForm = useCallback(() => {
        setShowForm(false);
        setEditingItem(null);
    }, []);
    const handleSave = useCallback((formData) => {
        if (editingItem) {
            setData(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
        }
        else {
            const newItem = { id: Date.now(), ...formData };
            setData(prev => [...prev, newItem]);
        }
        setCurrentPage(1);
        setShowForm(false);
        setEditingItem(null);
    }, [editingItem, setCurrentPage]);
    const handleRowsPerPageChange = useCallback((e) => {
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
//# sourceMappingURL=useCrudData.js.map