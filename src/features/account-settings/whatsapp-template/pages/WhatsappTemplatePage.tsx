import { Check, X } from 'lucide-react';
import { useWhatsappTemplatePage } from '../hooks';
import AddWhatsappTemplateDrawer from '../components/AddWhatsappTemplateDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

const MESSAGE_TRUNCATE_LENGTH = 80;

const truncate = (text: string | undefined | null, maxLength: number): string => {
  if (!text) return '-';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const WhatsappTemplatePage = () => {
  const {
    whatsappTemplate,
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
  } = useWhatsappTemplatePage();

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<WhatsappTemplateItem>[] = [
    { key: 'templateName', label: 'Template Name', render: (item) => item.templateName || item.name || '-' },
    { key: 'message', label: 'Message', render: (item) => truncate(item.message || item.content, MESSAGE_TRUNCATE_LENGTH) },
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
        <AddWhatsappTemplateDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? whatsappTemplate.editValidationSchema : whatsappTemplate.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={whatsappTemplate.isLoading}
          error={whatsappTemplate.error}
          isEditing={!!editingItem}
        />
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.templateName || deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
        {whatsappTemplate.showToast && (
          <div className={`toast-notification toast-${whatsappTemplate.toastType}`} onClick={() => whatsappTemplate.setShowToast(false)}>
            {whatsappTemplate.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{whatsappTemplate.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsappTemplatePage;
