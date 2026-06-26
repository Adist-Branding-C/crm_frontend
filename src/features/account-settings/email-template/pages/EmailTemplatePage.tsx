import { Check, X } from 'lucide-react';
import { useEmailTemplatePage } from '../hooks';
import AddEmailTemplateDrawer from '../components/AddEmailTemplateDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { EmailTemplateItem } from '../types/emailTemplate.types';

const EmailTemplatePage = () => {
  const {
    emailTemplate,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
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

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<EmailTemplateItem>[] = [
    { key: 'title', label: 'Template Name', render: (item) => item.title || item.templateName || '-' },
    { key: 'subject', label: 'Subject', render: (item) => item.subject || '-' },
    {
      key: 'htmlContent',
      label: 'Content',
      render: (item) => {
        const content = item.htmlContent || item.content || '';
        return content.length > 50 ? content.substring(0, 50) + '...' : content || '-';
      },
    },
    { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
  ];

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={handleAddClick}
          addLabel="Add Template"
          data={filteredData}
          columns={columns}
          startIndex={startIndex}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          currentPage={pageNumber}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalCount}
          onPageChange={setPageNumber}
          onRowsPerPageChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
        />
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
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.templateName || deletingItem?.title || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
        {emailTemplate.showToast && (
          <div className={`toast-notification toast-${emailTemplate.toastType}`} onClick={() => emailTemplate.setShowToast(false)}>
            {emailTemplate.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{emailTemplate.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplatePage;
