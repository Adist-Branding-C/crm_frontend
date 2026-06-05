import { Plus } from 'lucide-react';
import { useEmailTemplatePage } from '../hooks/useEmailTemplatePage';
import AddEmailTemplateDrawer from '../components/AddEmailTemplateDrawer';
import DeleteEmailTemplateModal from '../components/DeleteEmailTemplateModal';
import EmailTemplateTable from '../components/EmailTemplateTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './EmailTemplatePage.css';

const EmailTemplatePage = () => {
  const {
    emailTemplate,
    searchQuery, setSearchQuery,
    showDrawer,
    dropdownOpen, setDropdownOpen,
    editingItem,
    deletingItem,
    rowsPerPage, setRowsPerPage,
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
  } = useEmailTemplatePage();

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
              onEdit={(item) => { handleEditClick(item); setDropdownOpen(null); }}
              onDelete={(item) => { handleDeleteClick(item); setDropdownOpen(null); }}
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
