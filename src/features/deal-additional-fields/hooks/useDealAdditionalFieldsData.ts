import { useState } from 'react';
import { INITIAL_DATA } from '../constants';
import type { DealAdditionalField, FormData } from '../types';

const INITIAL_FORM_DATA: FormData = {
  fieldName: '',
  fieldType: '',
  inFilter: false,
  inList: false,
  required: false,
};

export const useDealAdditionalFieldsData = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DealAdditionalField | null>(null);
  const [deletingItem, setDeletingItem] = useState<DealAdditionalField | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const filteredData = data.filter(item =>
    item.field?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleEditClick = (item: DealAdditionalField) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({
      fieldName: item.field,
      fieldType: item.type,
      inFilter: item.inFilter,
      inList: item.inList,
      required: item.required,
    });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: DealAdditionalField) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    setData(prev => prev.filter(item => item.id !== deletingItem.id));
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item =>
        item.id === editingItem.id ? {
          ...item,
          field: formData.fieldName,
          type: formData.fieldType,
          inFilter: formData.inFilter,
          inList: formData.inList,
          required: formData.required,
        } : item
      ));
    } else {
      setData(prev => [...prev, {
        id: Date.now(),
        field: formData.fieldName,
        type: formData.fieldType,
        inFilter: formData.inFilter,
        inList: formData.inList,
        required: formData.required,
      }]);
    }
    handleCloseForm();
  };

  return {
    data,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    dropdownOpen,
    setDropdownOpen,
    formData,
    filteredData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleInputChange,
    handleSubmit,
  };
};
