import { useState, useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useEmailTemplate } from './useEmailTemplate';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';

export function useEmailTemplatePage() {
  const emailTemplate = useEmailTemplate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<EmailTemplateItem | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState<EmailTemplateItem | null>(null);

  const filteredData = useMemo(
    () => emailTemplate.emailTemplateList.filter(item =>
      (item.templateName || item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subject || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [emailTemplate.emailTemplateList, searchQuery]
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
    values: EmailTemplateFormData,
    helpers: FormikHelpers<EmailTemplateFormData>,
  ) => {
    const success = await emailTemplate.handleAddEmailTemplate(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [emailTemplate.handleAddEmailTemplate, handleCloseDrawer]);

  const handleEditClick = useCallback((item: EmailTemplateItem) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: EmailTemplateItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await emailTemplate.handleDeleteEmailTemplate(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, emailTemplate.handleDeleteEmailTemplate]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues: EmailTemplateFormData = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.title || '',
          subject: editingItem.subject || '',
          content: editingItem.content || editingItem.htmlCode || '',
          isDefault: editingItem.isDefault ?? false,
          status: editingItem.status || '',
        }
      : emailTemplate.initialValues,
    [editingItem, emailTemplate.initialValues]
  );

  const handleEditSubmit = useCallback(async (
    values: EmailTemplateFormData,
    helpers: FormikHelpers<EmailTemplateFormData>,
  ) => {
    if (!editingItem) return;
    const success = await emailTemplate.handleUpdateEmailTemplate(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, emailTemplate.handleUpdateEmailTemplate, handleCloseDrawer]);

  return {
    emailTemplate,
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
