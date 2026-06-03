import { useState, useCallback, useMemo } from 'react';
import { EMAIL_TEMPLATE_DATA } from '../constants';
import type { EmailTemplateItem } from '../types';

export function useEmailTemplateData() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EmailTemplateItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<EmailTemplateItem | null>(null);
  const [formData, setFormData] = useState({ title: '', htmlCode: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = useMemo(() =>
    EMAIL_TEMPLATE_DATA.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAddClick = useCallback(() => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ title: '', htmlCode: '' });
  }, []);

  const handleEditClick = useCallback((item: EmailTemplateItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ title: item.title, htmlCode: item.htmlCode || '' });
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: EmailTemplateItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
  }, []);

  return {
    showForm, editingItem, deletingItem, formData, searchQuery, rowsPerPage, dropdownOpen,
    setShowForm, setEditingItem, setDeletingItem, setFormData, setSearchQuery, setRowsPerPage, setDropdownOpen,
    filteredData,
    handleInputChange, handleAddClick, handleEditClick, handleDeleteClick,
    handleConfirmDelete, handleCloseForm,
  };
}
