import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useEmailTemplate } from '../hooks/useEmailTemplate';
import AddEmailTemplateDrawer from '../components/AddEmailTemplateDrawer';
import DeleteEmailTemplateModal from '../components/DeleteEmailTemplateModal';
import EmailTemplateTable from '../components/EmailTemplateTable';
import './EmailTemplatePage.css';

const EmailTemplatePage = () => {
  const emailTemplate = useEmailTemplate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState(null);

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

  const handleSubmit = useCallback(async (values, helpers) => {
    const success = await emailTemplate.handleAddEmailTemplate(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [emailTemplate.handleAddEmailTemplate, handleCloseDrawer]);

  const handleEditClick = useCallback((item) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item) => {
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

  const drawerInitialValues = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.title || '',
          subject: editingItem.subject || '',
          content: editingItem.content || editingItem.htmlCode || '',
          status: editingItem.status || '',
        }
      : emailTemplate.initialValues,
    [editingItem, emailTemplate.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await emailTemplate.handleUpdateEmailTemplate(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, emailTemplate.handleUpdateEmailTemplate, handleCloseDrawer]);

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Templates
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Template
              </button>
            </div>
          </div>
          <div className="email-template-table-wrapper">
            <EmailTemplateTable
              data={filteredData.slice(0, rowsPerPage)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              totalRecords={filteredData.length}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
          <AddEmailTemplateDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={emailTemplate.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={emailTemplate.isLoading}
            error={emailTemplate.error}
            isEditing={!!editingItem}
          />
          <DeleteEmailTemplateModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.templateName || deletingItem?.title || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatePage;
