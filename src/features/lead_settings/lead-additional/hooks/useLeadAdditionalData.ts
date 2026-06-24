import { useState } from 'react';
import { INITIAL_DATA } from '../constants';
import type { AdditionalField, FormData } from '../types';

const INITIAL_FORM_DATA: FormData = {
  fieldName: '',
  fieldType: '',
  inFilter: false,
  inList: false,
  required: false,
  purpose: false,
};

export const useLeadAdditionalData = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<AdditionalField | null>(null);
  const [deletingItem, setDeletingItem] = useState<AdditionalField | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleEditClick = (item: AdditionalField) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({
      fieldName: item.field,
      fieldType: item.type,
      inFilter: item.inFilter,
      inList: item.inList,
      required: item.required,
      purpose: item.purpose,
    });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: AdditionalField) => {
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
          purpose: formData.purpose,
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
        purpose: formData.purpose,
      }]);
    }
    handleCloseForm();
  };

  return {
    data,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    dropdownOpen,
    setDropdownOpen,
    formData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleInputChange,
    handleSubmit,
  };
};
