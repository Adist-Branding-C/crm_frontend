import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useWhatsappTemplate } from '../hooks/useWhatsappTemplate';
import AddWhatsappTemplateDrawer from '../components/AddWhatsappTemplateDrawer';
import DeleteWhatsappTemplateModal from '../components/DeleteWhatsappTemplateModal';
import WhatsappTemplateTable from '../components/WhatsappTemplateTable';
import './WhatsappTemplatePage.css';

const WhatsappTemplatePage = () => {
  const whatsappTemplate = useWhatsappTemplate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState(null);

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

  const handleSubmit = useCallback(async (values, helpers) => {
    const success = await whatsappTemplate.handleAddWhatsappTemplate(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [whatsappTemplate.handleAddWhatsappTemplate, handleCloseDrawer]);

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
    const success = await whatsappTemplate.handleDeleteWhatsappTemplate(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, whatsappTemplate.handleDeleteWhatsappTemplate]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? {
          templateName: editingItem.templateName || editingItem.name || '',
          message: editingItem.message || editingItem.content || '',
          status: editingItem.status || '',
        }
      : whatsappTemplate.initialValues,
    [editingItem, whatsappTemplate.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await whatsappTemplate.handleUpdateWhatsappTemplate(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, whatsappTemplate.handleUpdateWhatsappTemplate, handleCloseDrawer]);

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
          <div className="whatsapp-template-table-wrapper">
            <WhatsappTemplateTable
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
          <AddWhatsappTemplateDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={whatsappTemplate.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={whatsappTemplate.isLoading}
            error={whatsappTemplate.error}
            isEditing={!!editingItem}
          />
          <DeleteWhatsappTemplateModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.templateName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatsappTemplatePage;
