import { Plus } from 'lucide-react';
import { useEmailTemplatePage } from '../hooks';
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
    rowsPerPage, setRowsPerPage,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    totalRecords,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
  } = useEmailTemplatePage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{totalRecords}</span> / <span className="usage-total">{totalRecords}</span> Templates
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
              totalRecords={totalRecords}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={onToggleDropdown}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
          <AddEmailTemplateDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={editingItem ? emailTemplate.editValidationSchema : emailTemplate.validationSchema}
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
