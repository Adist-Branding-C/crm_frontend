import { Check, X } from 'lucide-react';
import { useWhatsappTemplatePage } from '../hooks';
import AddWhatsappTemplateDrawer from '../components/AddWhatsappTemplateDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { WHATSAPP_TEMPLATE_TABLE_COLUMNS } from '../constants/whatsappTemplateTableColumns';

const WhatsappTemplatePage = () => {
  const {
    whatsappTemplate,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    startIndex,
    totalPages,
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
          columns={WHATSAPP_TEMPLATE_TABLE_COLUMNS}
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
          onRowsPerPageChange={handleRowsPerPageChange}
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
