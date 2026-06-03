import { useState } from 'react';
import { MAIL_CONFIG_DATA, INITIAL_MAIL_FORM } from '../constants';
import type { MailConfigItem } from '../types';

export const useMailConfigData = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MailConfigItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MailConfigItem | null>(null);
  const [formData, setFormData] = useState(INITIAL_MAIL_FORM);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = MAIL_CONFIG_DATA.filter(item =>
    item.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData(INITIAL_MAIL_FORM);
  };

  const handleEditClick = (item: MailConfigItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({
      driver: item.driver,
      host: item.host || '',
      port: String(item.port),
      encryption: item.encryption,
      username: item.username || '',
      password: item.password || '',
      fromEmail: item.fromEmail || '',
      fromName: item.fromName || '',
    });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: MailConfigItem) => {
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
