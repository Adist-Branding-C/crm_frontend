import { useState } from 'react';
import { CHECKOUT_NOTE_DATA } from '../constants';
import type { CheckoutNoteItem } from '../types';

export const useCheckoutNoteData = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CheckoutNoteItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CheckoutNoteItem | null>(null);
  const [formData, setFormData] = useState({ note: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = CHECKOUT_NOTE_DATA.filter(item =>
    item.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ note: '' });
  };

  const handleEditClick = (item: CheckoutNoteItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ note: item.note });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: CheckoutNoteItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ note: '' });
  };

  return {
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    formData,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dropdownOpen,
    setDropdownOpen,
    filteredData,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
  };
};
