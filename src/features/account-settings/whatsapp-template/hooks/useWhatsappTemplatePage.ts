import { useState, useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useWhatsappTemplate } from './useWhatsappTemplate';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types/whatsappTemplate.types';

export function useWhatsappTemplatePage() {
  const whatsappTemplate = useWhatsappTemplate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<WhatsappTemplateItem | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState<WhatsappTemplateItem | null>(null);

  const filteredData = useMemo(
    () => whatsappTemplate.whatsappTemplateList.filter(item =>
      (item.templateName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message || item.content || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [whatsappTemplate.whatsappTemplateList, searchQuery]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const handleSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    helpers: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    const success = await whatsappTemplate.handleAddWhatsappTemplate(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [whatsappTemplate.handleAddWhatsappTemplate, handleCloseDrawer]);

  const handleEditClick = useCallback((item: WhatsappTemplateItem) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: WhatsappTemplateItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await whatsappTemplate.handleDeleteWhatsappTemplate(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, whatsappTemplate.handleDeleteWhatsappTemplate]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues: WhatsappTemplateFormData = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.name || '',
          message: editingItem.message || editingItem.content || '',
          status: editingItem.status || '',
        }
      : whatsappTemplate.initialValues,
    [editingItem, whatsappTemplate.initialValues]
  );

  const handleEditSubmit = useCallback(async (
    values: WhatsappTemplateFormData,
    helpers: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    if (!editingItem) return;
    const success = await whatsappTemplate.handleUpdateWhatsappTemplate(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, whatsappTemplate.handleUpdateWhatsappTemplate, handleCloseDrawer]);

  return {
    whatsappTemplate,
    searchQuery,
    setSearchQuery,
    showDrawer,
    dropdownOpen,
    setDropdownOpen,
    editingItem,
    deletingItem,
    rowsPerPage,
    setRowsPerPage,
    filteredData,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
    drawerInitialValues,
  };
}
