import { useState, useCallback, useEffect, useMemo } from 'react';
import type { FormikHelpers } from 'formik';
import { mailConfigService } from '../services/mailConfig.service';
import { mapMailConfigToFormData } from '../utils/mapMailConfigToFormData';
import { INITIAL_MAIL_FORM } from '../constants';
import type { MailConfigItem, MailConfigFormData } from '../types';

function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    return axiosErr.response?.data?.message || fallback;
  }
  if (err && typeof err === 'object' && 'message' in err) {
    return (err as { message: string }).message;
  }
  return fallback;
}

export const useMailConfigData = () => {
  const [data, setData] = useState<MailConfigItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MailConfigItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MailConfigItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const fetchMailConfigs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mailConfigService.getAll({ search: searchQuery });
      if (response.status) {
        setData(response.data.items || []);
      } else {
        showToastMessage(response.message || 'Failed to load mail configurations', 'error');
      }
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to load mail configurations'), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, showToastMessage]);

  useEffect(() => {
    fetchMailConfigs();
  }, [fetchMailConfigs]);

  const filteredData = data.filter(item =>
    item.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const drawerInitialValues: MailConfigFormData = useMemo(
    () => (editingItem ? mapMailConfigToFormData(editingItem) : INITIAL_MAIL_FORM),
    [editingItem]
  );

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditClick = (item: MailConfigItem) => {
    setEditingItem(item);
    setShowForm(true);
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: MailConfigItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      const response = await mailConfigService.deleteMailConfig(deletingItem.id);
      if (response.status) {
        showToastMessage(response.message || 'Mail configuration deleted successfully', 'success');
        await fetchMailConfigs();
      } else {
        showToastMessage(response.message || 'Failed to delete mail configuration', 'error');
      }
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to delete mail configuration'), 'error');
    } finally {
      setDeletingItem(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (values: MailConfigFormData, helpers: FormikHelpers<MailConfigFormData>) => {
    try {
      const response = editingItem
        ? await mailConfigService.updateMailConfig(editingItem.id, values)
        : await mailConfigService.createMailConfig(values);

      if (response.status) {
        showToastMessage(response.message || `Mail configuration ${editingItem ? 'updated' : 'saved'} successfully`, 'success');
        handleCloseForm();
        await fetchMailConfigs();
      } else {
        showToastMessage(response.message || 'Failed to save mail configuration', 'error');
      }
    } catch (err) {
      showToastMessage(getErrorMessage(err, 'Failed to save mail configuration'), 'error');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return {
    isLoading,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    drawerInitialValues,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dropdownOpen,
    setDropdownOpen,
    filteredData,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleSubmit,
  };
};
