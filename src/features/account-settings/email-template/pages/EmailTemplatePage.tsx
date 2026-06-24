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
    { key: 'templateName', label: 'Template Name', render: (item) => item.templateName || item.title || '-' },
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
      </div>
    </div>
  );
};

export default EmailTemplatePage;
