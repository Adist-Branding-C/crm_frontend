import { useState } from 'react';
import { WHATSAPP_TEMPLATE_DATA } from '../constants';
import type { WhatsAppTemplateItem } from '../types';

export const useWhatsAppTemplateData = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<WhatsAppTemplateItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<WhatsAppTemplateItem | null>(null);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = WHATSAPP_TEMPLATE_DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ name: '', content: '' });
  };

  const handleEditClick = (item: WhatsAppTemplateItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ name: item.name, content: item.content });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: WhatsAppTemplateItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
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
